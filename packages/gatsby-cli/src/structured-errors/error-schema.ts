import Joi from "@hapi/joi"

const Position = Joi.object().keys({
  line: Joi.number(),
  column: Joi.number(),
})

const errorSchema = Joi.object().keys({
  code: Joi.string(),
  text: Joi.string(),
  stack: Joi.array()
    .items(
      Joi.object().keys({
        fileName: Joi.string(),
        functionName: Joi.string().allow(null),
        lineNumber: Joi.number().allow(null),
        columnNumber: Joi.number().allow(null),
      })
    )
    .allow(null),
  level: Joi.string().valid([`ERROR`, `WARNING`, `INFO`, `DEBUG`]),
  type: Joi.string().valid([`GRAPHQL`, `CONFIG`, `WEBPACK`, `PLUGIN`]),
  filePath: Joi.string(),
  location: Joi.object({
    start: Position.required(),
    end: Position,
  }),
  docsUrl: Joi.string().uri({
    allowRelative: false,
    relativeOnly: false,
  }),
  error: Joi.object({}).unknown(),
  context: Joi.object({}).unknown(),
  group: Joi.string(),
  panicOnBuild: Joi.boolean(),
})

export default errorSchema
