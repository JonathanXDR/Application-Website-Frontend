/* eslint-disable */

import * as sdk from 'hypertune';

export const queryCode = 'query FullQuery{root{example exampleFlag}}';

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
                example: { fieldArguments: {}, fieldQuery: null },
                exampleFlag: { fieldArguments: {}, fieldQuery: null },
              },
            },
          },
        },
      },
    },
  },
};

export const initData = {
  commitId: 14_108,
  hash: '6959447412302519',
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
            example: {
              id: 'WwhE5Y_r7doKUcM5xZ3MH',
              logs: {
                evaluations: {
                  Wk_E82g2kVIp1KLqEFEoc: 1,
                  kLA9XKZm1VYo1gZ8y09bu: 1,
                  '1Ml9nblJVThBHpk7aDRbg': 1,
                },
                events: {},
                exposures: {},
              },
              type: 'BooleanExpression',
              value: true,
              valueType: { type: 'BooleanValueType' },
            },
            exampleFlag: {
              id: '3V_BV-ggtJmc7riCzTWvk',
              logs: {
                evaluations: { '5eYF_5W96A_41hnSP-vSh': 1 },
                events: {},
                exposures: {},
              },
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'R8WNfrIeMP1KEE2n8Vzr1',
                  when: {
                    a: {
                      id: 'foEhWCXcpI5BJfeAzqxDE',
                      logs: { events: {}, exposures: {}, evaluations: {} },
                      type: 'GetFieldExpression',
                      object: {
                        id: 'VuYfZ2UFke102x6tOhV7-',
                        logs: { events: {}, exposures: {}, evaluations: {} },
                        type: 'VariableExpression',
                        valueType: {
                          type: 'ObjectValueType',
                          objectTypeName: 'Query_root_args',
                        },
                        variableId: '-Vq1C8DeuYLT9UBeoDfrt',
                      },
                      fieldPath: 'context > environment',
                      valueType: {
                        type: 'EnumValueType',
                        enumTypeName: 'Environment',
                      },
                    },
                    b: {
                      id: 'kz2q_OL0fzhU0VgZBRRcj',
                      logs: { events: {}, exposures: {}, evaluations: {} },
                      type: 'ListExpression',
                      items: [
                        {
                          id: 'MgoDFzr073w6DPw0s3mj2',
                          logs: { events: {}, exposures: {}, evaluations: {} },
                          type: 'EnumExpression',
                          value: 'development',
                          valueType: {
                            type: 'EnumValueType',
                            enumTypeName: 'Environment',
                          },
                        },
                      ],
                      valueType: {
                        type: 'ListValueType',
                        itemValueType: {
                          type: 'EnumValueType',
                          enumTypeName: 'Environment',
                        },
                      },
                    },
                    id: 'JfgddK9xKJwcLY9q9aFw2',
                    logs: { events: {}, exposures: {}, evaluations: {} },
                    type: 'ComparisonExpression',
                    operator: 'in',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'saq5kOXDuKQ4CSOT_8D4K',
                    logs: { events: {}, exposures: {}, evaluations: {} },
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
                {
                  id: 'HkQ82oreQczxOHefkdge9',
                  when: {
                    a: {
                      id: 'g933P_mY0Wogi82U0YkBC',
                      logs: { events: {}, exposures: {}, evaluations: {} },
                      type: 'GetFieldExpression',
                      object: {
                        id: 'jh9WOxxJNbfYF9Umdqjp7',
                        logs: { events: {}, exposures: {}, evaluations: {} },
                        type: 'VariableExpression',
                        valueType: {
                          type: 'ObjectValueType',
                          objectTypeName: 'Query_root_args',
                        },
                        variableId: '-Vq1C8DeuYLT9UBeoDfrt',
                      },
                      fieldPath: 'context > user > id',
                      valueType: { type: 'StringValueType' },
                    },
                    b: {
                      id: 'e3u7DKHiD2VheKMIlNfqd',
                      logs: { events: {}, exposures: {}, evaluations: {} },
                      type: 'ListExpression',
                      items: [
                        {
                          id: 'Z8HVp7ngrVCBRhMI3dsvp',
                          logs: { events: {}, exposures: {}, evaluations: {} },
                          type: 'StringExpression',
                          value: 'user_123',
                          valueType: { type: 'StringValueType' },
                        },
                        {
                          id: 'hB0ZPzMwIi61fqji9W_D_',
                          logs: { events: {}, exposures: {}, evaluations: {} },
                          type: 'StringExpression',
                          value: 'user_456',
                          valueType: { type: 'StringValueType' },
                        },
                      ],
                      valueType: {
                        type: 'ListValueType',
                        itemValueType: { type: 'StringValueType' },
                      },
                    },
                    id: 'qS5kF9VHGReVpZy5GXKIM',
                    logs: { events: {}, exposures: {}, evaluations: {} },
                    type: 'ComparisonExpression',
                    operator: 'in',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'N1pf_rgvlMT68cZfE_nJ_',
                    logs: { events: {}, exposures: {}, evaluations: {} },
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'el9EBqxYLz8JzPMCKfKOz',
                logs: { events: {}, exposures: {}, evaluations: {} },
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'F1ZynD4QSt1KmD_YMs-iO',
                logs: { events: {}, exposures: {}, evaluations: {} },
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
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
};

/**
 * @deprecated use '@vercel/flags/providers/hypertune' package instead.
 */
export const vercelFlagDefinitions = {
  example: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/3628/main/draft/logic?selected_field_path=root%3Eexample',
  },
  exampleFlag: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/3628/main/draft/logic?selected_field_path=root%3EexampleFlag',
  },
};

export type Rec = {};

export type Rec3 = {
  id: string;
  name: string;
  email: string;
};

export const EnvironmentEnumValues = [
  'development',
  'production',
  'test',
] as const;
export type Environment = (typeof EnvironmentEnumValues)[number];

/**
 * This `Context` input type is used for the `context` argument on your root field.
 * It contains details of the current `user` and `environment`.
 *
 * You can define other custom input types with fields that are primitives, enums
 * or other input types.
 */
export type Rec2 = {
  user: Rec3;
  environment: Environment;
};

export type RootArgs = {
  context: Rec2;
};

export type Root = {
  example: boolean;
  exampleFlag: boolean;
};

const rootFallback = { example: false, exampleFlag: false };

export class RootNode extends sdk.Node {
  override typeName = 'Root' as const;

  getRootArgs(): RootArgs {
    const { step } = this.props;
    return (
      step?.type === 'GetFieldStep' ? step.fieldArguments : {}
    ) as RootArgs;
  }

  get({ fallback = rootFallback as Root }: { fallback?: Root } = {}): Root {
    const getQuery = null;
    return this.getValue({ query: getQuery, fallback }) as Root;
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/3628/main/draft/logic?selected_field_path=root%3Eexample})
   */
  example({
    args: arguments_ = {},
    fallback,
  }: {
    args?: Rec;
    fallback: boolean;
  }): boolean {
    const properties0 = this.getFieldNodeProps('example', {
      fieldArguments: arguments_,
    });
    const expression0 = properties0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(properties0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(properties0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/3628/main/draft/logic?selected_field_path=root%3EexampleFlag})
   */
  exampleFlag({
    args: arguments_ = {},
    fallback,
  }: {
    args?: Rec;
    fallback: boolean;
  }): boolean {
    const properties0 = this.getFieldNodeProps('exampleFlag', {
      fieldArguments: arguments_,
    });
    const expression0 = properties0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(properties0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(properties0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
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
  root: Root;
};

const sourceFallback = { root: { example: false, exampleFlag: false } };

export type Rec5 = {
  args: RootArgs;
};

export type Rec4 = {
  root: Rec5;
};

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
  override typeName = 'Query' as const;

  get({
    args,
    fallback = sourceFallback as Source,
  }: {
    args: Rec4;
    fallback?: Source;
  }): Source {
    const getQuery = sdk.mergeFieldQueryAndArgs(
      query.fragmentDefinitions,
      sdk.getFieldQueryForPath(query.fragmentDefinitions, query.fieldQuery, []),
      args
    );
    return this.getValue({ query: getQuery, fallback }) as Source;
  }

  /**
   * You can add arguments to any field in your schema, which you can then use when
   * setting its logic, including the logic of any nested fields. Your root field
   * already has a `context` argument. Since all flags are nested under the root
   * field, this context will be available to all of them.
   */
  root({ args }: { args: RootArgs }): RootNode {
    const properties0 = this.getFieldNodeProps('root', {
      fieldArguments: args,
    });
    const expression0 = properties0.expression;

    if (
      expression0 &&
      expression0.type === 'ObjectExpression' &&
      expression0.objectTypeName === 'Root'
    ) {
      return new RootNode(properties0);
    }

    const node = new RootNode(properties0);
    node._logUnexpectedTypeError();
    return node;
  }
}

export type VariableValues = Rec;
export type DehydratedState = sdk.DehydratedState<Source, VariableValues>;
export type CreateSourceOptions = {
  token: string;
  variableValues?: VariableValues;
  override?: sdk.DeepPartial<Source> | null;
} & sdk.CreateOptions;

export function createSource({
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
  });
}

export const emptySource = new SourceNode({
  context: null,
  logger: null,
  parent: null,
  step: null,
  expression: null,
});

export function createSourceForServerOnly({
  token,
  variableValues = {},
  override,
  ...options
}: CreateSourceOptions): SourceNode {
  return typeof window === 'undefined'
    ? createSource({ token, variableValues, override, ...options })
    : emptySource;
}

/**
 * @deprecated use createSource instead.
 */
export const initHypertune = createSource;
/**
 * @deprecated use SourceNode instead.
 */
export type QueryNode = SourceNode;
/**
 * @deprecated use Source instead.
 */
export type Query = Source;
