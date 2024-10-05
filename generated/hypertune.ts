/* eslint-disable @typescript-eslint/no-empty-object-type */

import * as sdk from 'hypertune'

export const queryCode = 'query FullQuery{root{sections pages}}'

export const query: sdk.Query<sdk.ObjectValueWithVariables> = {
  variableDefinitions: {},
  fragmentDefinitions: {},
  fieldQuery: {
    Query: {
      type: 'InlineFragment',
      objectTypeName: 'Query',
      selection: {
        root: {
          fieldArguments: { __isPartialObject__: true },
          fieldQuery: {
            Root: {
              type: 'InlineFragment',
              objectTypeName: 'Root',
              selection: {
                sections: { fieldArguments: {}, fieldQuery: null },
                pages: { fieldArguments: {}, fieldQuery: null },
              },
            },
          },
        },
      },
    },
  },
}

export const initData = {
  commitId: 17_792,
  hash: '2847269218841946',
  reducedExpression: {
    id: 'disMuXQYcKRF8cMpqXTXf',
    logs: { events: {}, exposures: {}, evaluations: {} },
    type: 'ObjectExpression',
    fields: {
      root: {
        id: '1Wgj8r-_O-xgKIPl1aePR',
        body: {
          id: 'pNQJWH2AFPQrJwpfumxKK',
          logs: { events: {}, exposures: {}, evaluations: {} },
          type: 'ObjectExpression',
          fields: {
            sections: {
              id: 'IYduM9fMVGK9RHFZ5UTms',
              type: 'ListExpression',
              items: [
                {
                  id: 'yPoMcXas5JOy94YJJ_2U-',
                  type: 'BooleanExpression',
                  value: false,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { '5zcKIXSq7FvisMlWvd2_k': 1 } },
                },
                {
                  id: 'wUAsd4uZtPJbNguR6e_go',
                  type: 'BooleanExpression',
                  value: true,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { 'rSFSwj5M_q6PxS-2txEza': 1 } },
                },
                {
                  id: 'Pfl0yX2kLHdIzPziTYPAF',
                  type: 'BooleanExpression',
                  value: true,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { '0WCFMJ30bpBdHcCnsmhlA': 1 } },
                },
                {
                  id: 'AvkhgZ50nOjFKdKYZmgRH',
                  type: 'BooleanExpression',
                  value: false,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { H4Tvrcu12pttuEnRJ3TcT: 1 } },
                },
                {
                  id: '0t6cvOyxXccQdsFVX464U',
                  type: 'BooleanExpression',
                  value: true,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { ni3Zx6dw54Nf9coLXNFtb: 1 } },
                },
                {
                  id: 'wuMTmd0e7HGRetqZxTmhc',
                  type: 'BooleanExpression',
                  value: true,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { ciLpBqfi_SBhia97Bx_GA: 1 } },
                },
              ],
              valueType: {
                type: 'ListValueType',
                itemValueType: { type: 'BooleanValueType' },
              },
              logs: {
                evaluations: {
                  'CY-ED9lw2omeaD_xspBZA': 1,
                  '3NvofvDllU0BOIPPoCJM4': 1,
                  'e0-3AN-1CPe1hYaLghz-F': 1,
                },
              },
            },
            pages: {
              id: 'FLjb1haEMaf_nkl9U3BF3',
              type: 'ListExpression',
              items: [
                {
                  id: 'nvaxqmXR7XlZMOF4j71NV',
                  type: 'BooleanExpression',
                  value: true,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { U_t3FA60RhqMhFgLiWDoh: 1 } },
                },
                {
                  id: 'RqgUCdl7GXGJvqYJBzZVf',
                  type: 'BooleanExpression',
                  value: true,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { J65WaDg1_OU6n1YBykeQe: 1 } },
                },
                {
                  id: 'd2hQSMG9IeDNqu9sMUbbk',
                  type: 'BooleanExpression',
                  value: true,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { qPjD4Ygjx932bblm0wPuK: 1 } },
                },
                {
                  id: '6vu2fIczgoHcvL58QB4d1',
                  type: 'BooleanExpression',
                  value: false,
                  valueType: { type: 'BooleanValueType' },
                  logs: { evaluations: { 'fRnWuW_CzmCL-LnEVJAKS': 1 } },
                },
              ],
              valueType: {
                type: 'ListValueType',
                itemValueType: { type: 'BooleanValueType' },
              },
              logs: {
                evaluations: {
                  y24329owsZRZkIxu5NnID: 1,
                  dEuBmyuCR7Iz6XC4imQpU: 1,
                  Raa6_7ffKXm1Id34TZePj: 1,
                },
              },
            },
          },
          valueType: { type: 'ObjectValueType', objectTypeName: 'Root' },
          objectTypeName: 'Root',
        },
        logs: { events: {}, exposures: {}, evaluations: {} },
        type: 'FunctionExpression',
        valueType: {
          type: 'FunctionValueType',
          returnValueType: { type: 'ObjectValueType', objectTypeName: 'Root' },
          parameterValueTypes: [
            { type: 'ObjectValueType', objectTypeName: 'Query_root_args' },
          ],
        },
        parameters: [{ id: '-Vq1C8DeuYLT9UBeoDfrt', name: 'rootArgs' }],
      },
    },
    metadata: {
      permissions: { user: {}, group: { team: { write: 'allow' } } },
    },
    valueType: { type: 'ObjectValueType', objectTypeName: 'Query' },
    objectTypeName: 'Query',
  },
  splits: {},
  commitConfig: { splitConfig: {} },
}

/**
 * @deprecated use '@vercel/flags/providers/hypertune' package instead.
 */
export const vercelFlagDefinitions = {}

export type FlagValues = {}

export type FlagPaths = keyof FlagValues & string

export const flagFallbacks: FlagValues = {}

export function decodeFlagValues<TFlagPaths extends keyof FlagValues & string> (
  encodedValues: string,
  flagPaths: TFlagPaths[]
): Pick<FlagValues, TFlagPaths> {
  return sdk.decodeFlagValues({ flagPaths, encodedValues })
}

export type Rec = {}

export const EnvironmentEnumValues = ['development', 'production'] as const
export type Environment = (typeof EnvironmentEnumValues)[number]

/**
 * This `Context` input type is used for the `context` argument on your root field.
 * It contains details of the current `user` and `environment`.
 *
 * You can define other custom input types with fields that are primitives, enums
 * or other input types.
 */
export type Rec2 = {
  environment: Environment
}

export type RootArgs = {
  context: Rec2
}

export type Root = {
  sections: boolean[]
  pages: boolean[]
}

const rootFallback = { sections: [], pages: [] }

export class RootNode extends sdk.Node {
  override typeName = 'Root' as const

  getRootArgs (): RootArgs {
    const { step } = this.props
    return (
      step?.type === 'GetFieldStep' ? step.fieldArguments : {}
    ) as RootArgs
  }

  get ({ fallback = rootFallback as Root }: { fallback?: Root } = {}): Root {
    const getQuery = null
    return this.getValue({ query: getQuery, fallback }) as Root
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/3628/main/draft/logic?selected_field_path=root%3Esections})
   */
  sections ({
    args = {},
    itemFallback: fallback,
    listFallbackLength = 0,
  }: {
    args?: Rec
    itemFallback: boolean
    listFallbackLength?: number
  }): boolean[] {
    const props0 = this.getFieldNodeProps('sections', { fieldArguments: args })

    return new sdk.Node(props0)
      .getItemNodeProps({ fallbackLength: listFallbackLength })
      .map((props1) => {
        const expression1 = props1.expression

        if (expression1 && expression1.type === 'BooleanExpression') {
          const node = new sdk.BooleanNode(props1)
          return node.get({ fallback })
        }

        const node = new sdk.BooleanNode(props1)
        node._logUnexpectedTypeError()
        return node.get({ fallback })
      })
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/3628/main/draft/logic?selected_field_path=root%3Epages})
   */
  pages ({
    args = {},
    itemFallback: fallback,
    listFallbackLength = 0,
  }: {
    args?: Rec
    itemFallback: boolean
    listFallbackLength?: number
  }): boolean[] {
    const props0 = this.getFieldNodeProps('pages', { fieldArguments: args })

    return new sdk.Node(props0)
      .getItemNodeProps({ fallbackLength: listFallbackLength })
      .map((props1) => {
        const expression1 = props1.expression

        if (expression1 && expression1.type === 'BooleanExpression') {
          const node = new sdk.BooleanNode(props1)
          return node.get({ fallback })
        }

        const node = new sdk.BooleanNode(props1)
        node._logUnexpectedTypeError()
        return node.get({ fallback })
      })
  }
}

/**
 * This is your project schema expressed in GraphQL.
 *
 * Define `Boolean` fields for feature flags, custom `enum` fields for flags with
 * more than two states, `Int` fields for numeric flags like timeouts and limits,
 * `String` fields to manage in-app copy, `Void` fields for analytics events, and
 * fields with custom object and list types for more complex app configuration,
 * e.g. to use Hypertune as a CMS.
 *
 * Once you've changed your schema, set your flag logic in the Logic view.
 */
export type Source = {
  /**
   * You can add arguments to any field in your schema, which you can then use when
   * setting its logic, including the logic of any nested fields. Your root field
   * already has a `context` argument. Since all flags are nested under the root
   * field, this context will be available to all of them.
   */
  root: Root
}

const sourceFallback = { root: { sections: [], pages: [] } }

export type Rec4 = {
  args: RootArgs
}

export type Rec3 = {
  root: Rec4
}

/**
 * This is your project schema expressed in GraphQL.
 *
 * Define `Boolean` fields for feature flags, custom `enum` fields for flags with
 * more than two states, `Int` fields for numeric flags like timeouts and limits,
 * `String` fields to manage in-app copy, `Void` fields for analytics events, and
 * fields with custom object and list types for more complex app configuration,
 * e.g. to use Hypertune as a CMS.
 *
 * Once you've changed your schema, set your flag logic in the Logic view.
 */
export class SourceNode extends sdk.Node {
  override typeName = 'Query' as const

  get ({
    args,
    fallback = sourceFallback as Source,
  }: {
    args: Rec3
    fallback?: Source
  }): Source {
    const getQuery = sdk.mergeFieldQueryAndArgs(
      query.fragmentDefinitions,
      sdk.getFieldQueryForPath(query.fragmentDefinitions, query.fieldQuery, []),
      args
    )
    return this.getValue({ query: getQuery, fallback }) as Source
  }

  /**
   * You can add arguments to any field in your schema, which you can then use when
   * setting its logic, including the logic of any nested fields. Your root field
   * already has a `context` argument. Since all flags are nested under the root
   * field, this context will be available to all of them.
   */
  root ({ args }: { args: RootArgs }): RootNode {
    const props0 = this.getFieldNodeProps('root', { fieldArguments: args })
    const expression0 = props0.expression

    if (
      expression0 &&
      expression0.type === 'ObjectExpression' &&
      expression0.objectTypeName === 'Root'
    ) {
      return new RootNode(props0)
    }

    const node = new RootNode(props0)
    node._logUnexpectedTypeError()
    return node
  }
}

export type VariableValues = Rec
export type DehydratedState = sdk.DehydratedState<Source, VariableValues>
export type CreateSourceOptions = {
  token: string
  variableValues?: VariableValues
  override?: sdk.DeepPartial<Source> | null
} & sdk.CreateOptions

export function createSource ({
  token,
  variableValues = {},
  override,
  ...options
}: CreateSourceOptions): SourceNode {
  return sdk.create({
    NodeConstructor: SourceNode,
    token,
    query,
    queryCode,
    variableValues,
    override,
    options: { initData: initData as unknown as sdk.InitData, ...options },
  })
}

export const emptySource = new SourceNode({
  context: null,
  logger: null,
  parent: null,
  step: null,
  expression: null,
})

export function createSourceForServerOnly ({
  token,
  variableValues = {},
  override,
  ...options
}: CreateSourceOptions): SourceNode {
  return typeof window === 'undefined'
    ? createSource({ token, variableValues, override, ...options })
    : emptySource
}

/**
 * @deprecated use createSource instead.
 */
export const initHypertune = createSource
/**
 * @deprecated use SourceNode instead.
 */
export type QueryNode = SourceNode
/**
 * @deprecated use Source instead.
 */
export type Query = Source
