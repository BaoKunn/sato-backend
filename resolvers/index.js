import FolderModel from "../models/FolderModel.js";

export const resolvers = {
    Query: {
        folders: async () => {
            const folder = await FolderModel
            return fakeData.folders
        },
        folder: (parent, args) => {
            const folderId = args.folderId;
            console.log(folderId);
            return fakeData.folders.find(folder => folder.id === folderId);
        }
    },
    Folder: {
        author: (parent, args) => {
            const authorId = parent.authorId
            return fakeData.authors.find(author => author.id === authorId)
        }
    },
    Mutation: {
        addFolder: async (parent, args) => {
            const newFolder = new FolderModel(args);
            await newFolder.save();
            return newFolder;
        }
    }
};