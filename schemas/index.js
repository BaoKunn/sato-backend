export const typeDefs = `#graphql
    type Folder {
        id: String,
        name: String,
        createAt: String,
        author: Author,
    }

    type Author {
        id: String,
        name: String,
    }

    type Query {
        folders: [Folder],
        folder(folderId: String): Folder
    }

    type Mutation {
        addFolder(name: String, authorId: ID): Folder
    }
`;