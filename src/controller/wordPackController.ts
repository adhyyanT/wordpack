import { Request, Response } from "express";
import { TWordPack, TWordPackRequest } from "../model/WordPack";
import wordPackService from "../service/wordPackService";

class WordPackController {
  private static _wordPackController: WordPackController;
  private constructor() {}
  static getInstance() {
    if (!this._wordPackController) {
      this._wordPackController = new WordPackController();
    }
    return this._wordPackController;
  }
  async createWordPack(
    req: Request<unknown, unknown, TWordPackRequest>,
    res: Response<TWordPack | unknown>
  ) {
    try {
      const wordPack = await wordPackService.createWordPack(req.body, req.user);
      res.status(201).json(wordPack);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
  async getWordPack(req: Request<{ wordPackId: string }>, res: Response) {
    try {
      const wordPack = await wordPackService.getWordPack(req.params.wordPackId);
      if (!wordPack) {
        res.status(404).json({ error: "word pack not found" });
        return;
      }
      res.status(200).json(wordPack);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default WordPackController.getInstance();
