import * as subscriptions from '../../src/graphql/subscriptions';
import {generateClient} from 'aws-amplify/api';

const client = generateClient();

export const deleteRecipeSub = client.graphql({
  query: subscriptions.onDeleteRecipe,
}) as {
  subscribe: (options: {
    next: (value: any) => void;
    error: (error: any) => void;
  }) => void;
};

export const createRecipeSub = client.graphql({
  query: subscriptions.onCreateRecipe,
}) as {
  subscribe: (options: {
    next: (value: any) => void;
    error: (error: any) => void;
  }) => void;
};
