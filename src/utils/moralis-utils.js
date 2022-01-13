export async function isCryptoAuthenticated(chain, limit) {
  const currentUser = Moralis.User.current();
  if (currentUser) {
    // do stuff with the user
    const options = { chain: "Eth", address: currentUser.ethAddress, limit: "10" };

    return !!currentUser;
  } else {
    // show the signup or login page
    Moralis.authenticate().then(function(user) {
      console.log(user.get("ethAddress"));
      return !!user;
    });
  }
}

export async function getNfts(chain, address, limit, filter) {
  //get chain
  const isAuth = await isCryptoAuthenticated();
  if (isAuth) {
    const userEthNFTs = await Moralis.Web3API.account.getNFTs();
    console.log(userEthNFTs);
    //send ethnfts to fetchNfts and stor the retrived nft data
    const nftData = await fetchNfts(userEthNFTs);
    return nftData;
  }
}

export async function fetchNfts(userEthNFTS) {
  //fetch each nft and store it in as a entry
  //
  const nfts = {
    entries: []
  };
  const fetchdata = await userEthNFTS.result.forEach(nft => {
    const data = fetch(nft.token_uri)
      .then(res => res.json())
      .then(data => {
        nfts.entries.push(data);
      });
  });
  console.log(nfts);
  return nfts;
}

export async function logoutMoralis() {
  Moralis.User.logOut().then(() => {
    const currentUser = Moralis.User.current(); // this will now be null
  });
}
