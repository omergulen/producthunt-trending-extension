import { GraphQLClient } from "graphql-request";
import moment from "moment";
import { find, sample } from 'lodash';
import {
  getObject,
  KEY_SELECTED_PERIOD
} from './localStorage';
const tokenKey = "producthunt_token";
const token =
  window.localStorage.getItem(tokenKey) ||
  "7b0847b485e952e44556d6b483d018cd3ec0e63f1e019d0a5db48ff29dfe15ba";

export function getProducts() {


  let finalRange = getObject(KEY_SELECTED_PERIOD);
  let since = null;
  if (finalRange === "daily") {
    since = moment()
      .startOf("day")
      .toDate();
  } else if (finalRange === "weekly") {
    since = moment()
      .subtract(7, "days")
      .toDate();
  } else if (finalRange === "monthly") {
    since = moment()
      .subtract(30, "days")
      .toDate();
  } else if (finalRange === "yearly") {
    since = moment()
      .subtract(365, "days")
      .toDate();
  }

  const params = {
    token,
    since
  };

  const client = new GraphQLClient(
    "https://api.producthunt.com/v2/api/graphql",
    {
      headers: {
        authorization: `Bearer ${params.token}`
      },
      mode: "cors"
    }
  );
  const options = Object.assign(
    {
      since: moment()
        .subtract(30, "days")
        .toDate()
    },
    params
  );
  const postedAfter = options.since.toISOString();

  let query = `{
    posts(order:VOTES,postedAfter:"${postedAfter}"`;

  query += `){
      pageInfo {
        endCursor
        startCursor
      }
      totalCount
      edges {
        node {
          id
          createdAt
          name
          description
          votesCount
          url
          website
          commentsCount
          thumbnail {
            type
            url
            videoUrl
          }
          user {
            profileImage
            name
          }
        }
      }
    }
  }`;

  return client.rawRequest(query);
}

export const isEmptyList = list => !list || list.length === 0;

export const getRandomProducts = (products = []) =>
  sample(products);

export const periodOptions = [
  { value: 'daily', label: 'Trending today' },
  { value: 'weekly', label: 'Trending this week' },
  { value: 'monthly', label: 'Trending this month' },
  { value: 'yearly', label: 'Trending this year' }
];

export const findPeriod = Period => find(periodOptions, { value: Period });