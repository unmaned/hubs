import { EventTarget } from "event-target-shim";
import configs from "../utils/configs";
import { getReticulumFetchUrl, fetchReticulumAuthenticated, hasReticulumServer } from "../utils/phoenix-utils";
import { pushHistoryPath, sluglessPath, withSlug } from "../utils/history";

const EMPTY_RESULT = { entries: [], meta: {} };

const desiredSources = ["ethereum", "polygon", "solana"];
const SOURCES = desiredSources; //to enable compatibility with mediastore components
const SEARCH_CONTEXT_PARAMS = ["q", "filter", "cursor", "similar_to"];

// This class is responsible for fetching and storing nft search results and provides a
// convenience API for performing history updates relevant to search navigation.

export default class NFTSearchStore extends EventTarget {
  constructor() {
    super();

    this.requestIndex = 0;
  }
  //should find out what this does--> setHistory
  setHistory(history) {
    this.history = history;

    this._update(this.history.location);

    this.history.listen(location => {
      this._update(location);
    });
  }
}
