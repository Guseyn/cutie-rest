'use strict'

const { as } = require('@cuties/cutie')
const { If, Else } = require('@cuties/if-else')
const {
  ResponseWithHeaders,
  ResponseWithHeader,
  ResponseWithStatusCode,
  EndedResponse
} = require('@cuties/http')
const {
  CreatedOptions
} = require('@cuties/object')
const AllowedOrigin = require('./AllowedOrigin')
const HeadersWithAllowCredentialsHeader = require('./HeadersWithAllowCredentialsHeader')
const HeadersWithMaxAgeHeader = require('./HeadersWithMaxAgeHeader')

class CORSEndpoint {
  constructor (
    endpoint,
    {
      allowedOrigins,
      allowedMethods,
      allowedHeaders,
      allowedCredentials,
      maxAge
    } = {}
  ) {
    const initialEndpointBody = endpoint.body
    return endpoint.withAdditionalMethod('OPTIONS').withBody(
      this.body(
        endpoint,
        {
          allowedOrigins,
          allowedMethods,
          allowedHeaders,
          allowedCredentials,
          maxAge
        },
        initialEndpointBody
      )
    )
  }

  body (
    endpoint,
    {
      allowedOrigins,
      allowedMethods,
      allowedHeaders,
      allowedCredentials,
      maxAge
    },
    initialEndpointBody
  ) {
    return (request, response, ...args) => {
      return new HeadersWithMaxAgeHeader(
        new HeadersWithAllowCredentialsHeader(
          new CreatedOptions(
            'Access-Control-Allow-Origin',
            new AllowedOrigin(
              allowedOrigins, request
            ),
            'Access-Control-Allow-Methods',
            allowedMethods ? allowedMethods.join(', ') : endpoint.methods().join(', '),
            'Access-Control-Allow-Headers',
            allowedHeaders ? allowedHeaders.join(', ') : Object.keys(request.headers).join(', ')
          ), allowedCredentials
        ), maxAge
      ).as('CORS_HEADERS').after(
        new If(
          endpoint.is(request, 'OPTIONS'),
          new EndedResponse(
            new ResponseWithStatusCode(
              new ResponseWithHeaders(
                response, as('CORS_HEADERS')
              ), 200
            )
          ),
          new Else(
            initialEndpointBody(
              request,
              new ResponseWithHeader(
                response,
                'Access-Control-Allow-Origin',
                new AllowedOrigin(
                  allowedOrigins, request
                )
              ),
              ...args
            )
          )
        )
      )
    }
  }
}

module.exports = CORSEndpoint
