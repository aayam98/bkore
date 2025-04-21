import { gql } from 'graphql-request';
import getStorefront from './config';

const storefront = getStorefront();

interface CustomerUserError {
  code?: string;
  field: string[];
  message: string;
}

export interface CreateCustomerResponse {
  customerUserErrors: CustomerUserError[];
  customer?: {
    id: string;
  };
}

export const createCustomer = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  acceptsMarketing?: boolean
): Promise<CreateCustomerResponse> => {
  const mutation = gql`
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
      phone,
      acceptsMarketing,
    },
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.customerCreate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { customerUserErrors: [] };
  }
};

export const updateCustomer = async (
  email: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  customerAccessToken?: string
): Promise<CreateCustomerResponse> => {
  console.log('update customer', {
    email,
    password,
    firstName,
    lastName,
    customerAccessToken,
  });
  const mutation = gql`
    mutation CustomerUpdate(
      $customerAccessToken: String!
      $customer: CustomerUpdateInput!
    ) {
      customerUpdate(
        customerAccessToken: $customerAccessToken
        customer: $customer
      ) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }
  `;
  const variables = {
    customerAccessToken: customerAccessToken,
    customer: {
      email,
      password,
      firstName,
      lastName,
    },
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.customerUpdate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { customerUserErrors: [] };
  }
};

export interface CreateCustomerTokenResponse {
  customerUserErrors: CustomerUserError[];
  customerAccessToken?: {
    accessToken: string;
    expiresAt: string;
  };
}

export const createCustomerToken = async (
  email: string,
  password: string
): Promise<CreateCustomerTokenResponse> => {
  const query = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      password,
    },
  };
  try {
    const res = await storefront.request(query, variables);
    return res.customerAccessTokenCreate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { customerUserErrors: [] };
  }
};

export interface ReciverCustomerPasswordResponse {
  customerUserErrors: CustomerUserError[];
}

export const recoverCustomerPassword = async (email: string) => {
  const mutation = gql`
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    email,
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.customerRecover;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { customerUserErrors: [] };
  }
};

export interface Order {
  node: {
    orderNumber: string;
    totalPrice: {
      amount: Number;
    };
    fulfillmentStatus: string;
    processedAt: string;
    lineItems: {
      nodes: {
        quantity: number;
      }[];
    };
    totalShippingPrice: {
      amount: Number;
    };
    financialStatus: string;
  };
}

export const getCustomerOrders = async (
  customerAccessToken: string
): Promise<Order[]> => {
  const query = gql`
    query Orders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 100) {
          edges {
            node {
              orderNumber
              totalPrice {
                amount
              }
              fulfillmentStatus
              processedAt
              lineItems(first: 100) {
                nodes {
                  quantity
                }
              }
              totalShippingPrice {
                amount
              }
              financialStatus
            }
          }
        }
      }
    }
  `;
  const variables = {
    customerAccessToken,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.customer === null ? [] : res.customer.orders.edges;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return [];
  }
};

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const getCustomerId = async (
  customerAccessToken: string
): Promise<Customer | undefined> => {
  const query = gql`
    query CustomerID($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
      }
    }
  `;
  const variables = {
    customerAccessToken,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.customer;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return undefined;
  }
};
