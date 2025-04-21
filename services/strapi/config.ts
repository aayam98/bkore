import { GraphQLClient } from 'graphql-request';

let graphcms: GraphQLClient;

export default function getStrapicms() {
  if (!graphcms) {
    graphcms = new GraphQLClient(process.env.STRAPICMS_ENDPOINT! || "https://cms.bodykore.com/graphql", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPICMS_ACCESS_TOKEN! || '203e235392840dc4a1de7567f394f41b8a2b73824c62147af26be1216453e2f879181872f41a336a26941ecdab9649d0f7ef5c4bfe22c0daaefbeb994cc3f1a615c43b87831facf8addffbf78c6f5d5fa92fe81cc9009a520b82dcf705ee76917105cc319817e4931cacabcfbde454dbbd54774b7129af11acf3a91efeadbde0'}`,
      } as HeadersInit,
    });
    return graphcms;
  }
  return graphcms;
}
