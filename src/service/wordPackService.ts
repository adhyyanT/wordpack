import mongoose from "mongoose";
import { AppUser, TAppUserResponse } from "../model/AppUser";
import { TWord, Word } from "../model/Word";
import {
  TWordPackRequest,
  TWordPackResponse,
  TWordPopulated,
  WordPack,
} from "../model/WordPack";

class WordPackService {
  private static _wordPackService: WordPackService;
  private constructor() {}
  static getInstance() {
    if (!this._wordPackService) {
      this._wordPackService = new WordPackService();
    }
    return this._wordPackService;
  }

  async createWordPack(
    wordPackRequest: TWordPackRequest,
    loggedInUser: TAppUserResponse
  ): Promise<TWordPackResponse> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const words = wordPackRequest.words.map((word) => new Word(word));
      const savedWords = await Word.insertMany(words, { session: session });

      const wordPack = new WordPack(wordPackRequest);
      wordPack.words = savedWords.map((word) => word._id);
      wordPack.createdBy = loggedInUser.id;
      const savedPack = await wordPack.save({ session });

      const user = await AppUser.findOne({ email: loggedInUser.email });
      if (!user) throw new Error("User not found");
      user.wordPacks.push(savedPack._id);
      await user.save({ session });
      session.commitTransaction();
      return {
        description: savedPack.description,
        id: savedPack._id,
        isPublic: savedPack.isPublic,
        title: savedPack.title,
        words: savedWords.map((w) => ({
          createdAt: w.createdAt,
          description: w.description,
          title: w.title,
          updatedAt: w.updatedAt,
          id: w._id,
        })),
        createdBy: savedPack.createdBy,
      };
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw error;
    }
  }

  async getWordPack(id: string): Promise<TWordPackResponse | undefined> {
    const wordPackId = new mongoose.Types.ObjectId(id);
    const wordPack = (await WordPack.findOne({ _id: wordPackId })
      .populate<TWord>("words")
      .exec()) as TWordPopulated | null;
    if (!wordPack) return;
    return {
      description: wordPack?.description,
      id: wordPack._id,
      isPublic: wordPack.isPublic,
      title: wordPack.title,
      words: wordPack.words.map((w) => ({
        createdAt: w.createdAt,
        description: w.description,
        title: w.title,
        updatedAt: w.updatedAt,
        id: w._id,
      })),
      createdBy: wordPack.createdBy,
    };
  }
}
export default WordPackService.getInstance();
