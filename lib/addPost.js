import { createClient } from "contentful-management";

const spaceId = "bgueafn491vm";
/* process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID */
const environmentId = "blogPost";
const contentTypeId = "Blog Post";

const client = createClient({
  accessToken: "CFPAT-H5cUytzu08VQhnPOrC6msH7SdCZ0vd-PQGMzY72X2Sw",
});

export async function newPost(
  title,
  body,
  authors,
  media,
  introduction,
  category
) {
  client
    .getSpace(spaceId)
    .then((space) => space.getEnvironment(environmentId))
    .then((environment) =>
      environment.createEntry(contentTypeId, {
        fields: {
          title: {
            "en-US": title,
          },
          date: {
            "en-US": new Date(),
          },
          body: {
            "en-US": body,
          },
          authors: {
            "en-US": authors,
          },
          media: {
            "en-US": media,
          },
          introduction: {
            "en-US": introduction,
          },
          category: {
            "en-US": category,
          },
        },
      })
    )
    .then((entry) => console.log("ENTRY", entry))
    .catch(console.error);
}

/*
// Create entry
client.getSpace('<space_id>')
.then((space) => space.getEnvironment('<environment-id>'))
.then((environment) => environment.createEntryWithId('<content_type_id>', '<entry_id>', {
  fields: {
    title: {
      'en-US': 'Entry title'
    }
  }
}))
.then((entry) => console.log(entry))
.catch(console.error)
*/

/*
// Update entry
client.getSpace('<space_id>')
.then((space) => space.getEnvironment('<environment-id>'))
.then((environment) => environment.getEntry('<entry_id>'))
.then((entry) => {
  entry.fields.title['en-US'] = 'New entry title'
  return entry.update()
})
.then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
.catch(console.error)
*/

export default { newPost };
