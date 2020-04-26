const { db } = require("../util/admin");

//============================================================================================================================
/*
  _______  _______ .___________.        ___       __       __              _______.  ______ .______       _______     ___      .___  ___.      _______.
 /  _____||   ____||           |       /   \     |  |     |  |            /       | /      ||   _  \     |   ____|   /   \     |   \/   |     /       |
|  |  __  |  |__   `---|  |----`      /  ^  \    |  |     |  |           |   (----`|  ,----'|  |_)  |    |  |__     /  ^  \    |  \  /  |    |   (----`
|  | |_ | |   __|      |  |          /  /_\  \   |  |     |  |            \   \    |  |     |      /     |   __|   /  /_\  \   |  |\/|  |     \   \    
|  |__| | |  |____     |  |         /  _____  \  |  `----.|  `----.   .----)   |   |  `----.|  |\  \----.|  |____ /  _____  \  |  |  |  | .----)   |   
 \______| |_______|    |__|        /__/     \__\ |_______||_______|   |_______/     \______|| _| `._____||_______/__/     \__\ |__|  |__| |_______/    
                                                                                                                                                       
*/
//============================================================================================================================

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("likeCount", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
          tag: doc.data().tag,
          location: doc.data().location
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//============================================================================================================================
/*
.______     ______        _______.___________.        ___    _______   _______  __       _______ .___________. _______ 
|   _  \   /  __  \      /       |           |       /  /   |       \ |   ____||  |     |   ____||           ||   ____|
|  |_)  | |  |  |  |    |   (----`---|  |----`      /  /    |  .--.  ||  |__   |  |     |  |__   `---|  |----`|  |__   
|   ___/  |  |  |  |     \   \       |  |          /  /     |  |  |  ||   __|  |  |     |   __|      |  |     |   __|  
|  |      |  `--'  | .----)   |      |  |         /  /      |  '--'  ||  |____ |  `----.|  |____     |  |     |  |____ 
| _|       \______/  |_______/       |__|        /__/       |_______/ |_______||_______||_______|    |__|     |_______|
*/
//============================================================================================================================

//----------------
//POST A SCREAM
//----------------

exports.postOneScream = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      res.json(resScream);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};


//----------------
//DELETE A SCREAM
//----------------

exports.deleteScream = (req, res) => {
  const document = db.doc(`/screams/${req.params.screamId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Scream deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//============================================================================================================================
/*
  _______  _______ .___________.        ___     ______   ______   .___  ___. .___  ___.  _______ .__   __. .___________.        _______.  ______ .______       _______     ___      .___  ___. 
 /  _____||   ____||           |       /  /    /      | /  __  \  |   \/   | |   \/   | |   ____||  \ |  | |           |       /       | /      ||   _  \     |   ____|   /   \     |   \/   | 
|  |  __  |  |__   `---|  |----`      /  /    |  ,----'|  |  |  | |  \  /  | |  \  /  | |  |__   |   \|  | `---|  |----`      |   (----`|  ,----'|  |_)  |    |  |__     /  ^  \    |  \  /  | 
|  | |_ | |   __|      |  |          /  /     |  |     |  |  |  | |  |\/|  | |  |\/|  | |   __|  |  . `  |     |  |            \   \    |  |     |      /     |   __|   /  /_\  \   |  |\/|  | 
|  |__| | |  |____     |  |         /  /      |  `----.|  `--'  | |  |  |  | |  |  |  | |  |____ |  |\   |     |  |        .----)   |   |  `----.|  |\  \----.|  |____ /  _____  \  |  |  |  | 
 \______| |_______|    |__|        /__/        \______| \______/  |__|  |__| |__|  |__| |_______||__| \__|     |__|        |_______/     \______|| _| `._____||_______/__/     \__\ |__|  |__| 
                                                                                                                                                                                               
*/
//============================================================================================================================

//----------------
//GET A SCREAM
//----------------

exports.getScream = (req, res) => {
  let screamData = {};
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("screamId", "==", req.params.screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//----------------
//COMMENT A SCREAM
//----------------

exports.commentOnScream = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
  };
  console.log(newComment);

  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};


//============================================================================================================================
/*
 __       __   __  ___  _______         ___      .__   __.  _______      __    __  .__   __.  __       __   __  ___  _______ 
|  |     |  | |  |/  / |   ____|       /   \     |  \ |  | |       \    |  |  |  | |  \ |  | |  |     |  | |  |/  / |   ____|
|  |     |  | |  '  /  |  |__         /  ^  \    |   \|  | |  .--.  |   |  |  |  | |   \|  | |  |     |  | |  '  /  |  |__   
|  |     |  | |    <   |   __|       /  /_\  \   |  . `  | |  |  |  |   |  |  |  | |  . `  | |  |     |  | |    <   |   __|  
|  `----.|  | |  .  \  |  |____     /  _____  \  |  |\   | |  '--'  |   |  `--'  | |  |\   | |  `----.|  | |  .  \  |  |____ 
|_______||__| |__|\__\ |_______|   /__/     \__\ |__| \__| |_______/     \______/  |__| \__| |_______||__| |__|\__\ |_______|
*/
//============================================================================================================================

//----------------
//LIKE A SCREAM
//----------------

exports.likeScream = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

    let num = 1;

db.collection("dislikes")
  .where("userHandle", "==", req.user.handle)
  .where("screamId", "==", req.params.screamId)
  .limit(1)
  .get()
  .then((data) => {
    if (!data.empty) {
      db
        .doc(`dislikes/${data.docs[0].id}`)
        .delete()
        .then(() => {
          num++;
        })
    }
})
.catch((err) => {
  console.error(err);
  return res.status(500).json({ error: err.code });
});

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle,
          })
          .then(() => {
            screamData.likeCount+= num;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          });
      } else {
        return res.status(400).json({ error: "Scream already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//----------------
//UNLIKE A SCREAM
//----------------

exports.unlikeScream = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Scream not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//----------------
//DISLIKE A SCREAM
//----------------

exports.dislikeScream = (req, res) => {
  const dislikeDocument = db
    .collection("dislikes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;
  let num = 1;

  //-----------------------------------------------------------------
  db.collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1)
    .get()
    .then((data) => {
      if (!data.empty) {
        db
          .doc(`likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            num++;
          })
      }
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).json({ error: err.code });
  });
  //-----------------------------------------------------------------
  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return dislikeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("dislikes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle,
          })
          .then(() => {
            screamData.likeCount -= num;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          });
      } else {
        return res.status(400).json({ error: "Scream already disliked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//----------------
//UNDISLIKE A SCREAM
//----------------

exports.undislikeScream = (req, res) => {
  const dislikeDocument = db
    .collection("dislikes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return dislikeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Scream not disliked" });
      } else {
        return db
          .doc(`/dislikes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//============================================================================================================================
/*
  _______  _______ .___________.        _______..______    _______   ______  __   _______  __    ______         _______.  ______ .______       _______     ___      .___  ___.      _______.
 /  _____||   ____||           |       /       ||   _  \  |   ____| /      ||  | |   ____||  |  /      |       /       | /      ||   _  \     |   ____|   /   \     |   \/   |     /       |
|  |  __  |  |__   `---|  |----`      |   (----`|  |_)  | |  |__   |  ,----'|  | |  |__   |  | |  ,----'      |   (----`|  ,----'|  |_)  |    |  |__     /  ^  \    |  \  /  |    |   (----`
|  | |_ | |   __|      |  |            \   \    |   ___/  |   __|  |  |     |  | |   __|  |  | |  |            \   \    |  |     |      /     |   __|   /  /_\  \   |  |\/|  |     \   \    
|  |__| | |  |____     |  |        .----)   |   |  |      |  |____ |  `----.|  | |  |     |  | |  `----.   .----)   |   |  `----.|  |\  \----.|  |____ /  _____  \  |  |  |  | .----)   |   
 \______| |_______|    |__|        |_______/    | _|      |_______| \______||__| |__|     |__|  \______|   |_______/     \______|| _| `._____||_______/__/     \__\ |__|  |__| |_______/    
                                                                                                                                                                                           
*/
//============================================================================================================================

//----------------
//GET HEALTHSHOT GROUP
//----------------

exports.getGroup = (req, res) => {
  db.collection("screams")
    .orderBy("likeCount", "desc")
    .where('groupName', '==', req.params.groupName)
    .limit(35)
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
          location: doc.data().location,
          groupName:doc.data().groupName,
          tag: doc.data().tag,
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//----------------
//GET HEALTHSHOT GROUPNAME & TAG
//----------------

exports.getGroupAndTag = (req, res) => {
  db.collection("screams")
    .orderBy("likeCount", "desc")
    .where('groupName', '==', req.params.groupName)
    .where('tag', '==', req.params.tag)
    .limit(35)
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
          location: doc.data().location,
          groupName:doc.data().groupName,
          tag: doc.data().tag,
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//----------------
//GET HEALTHSHOT GROUP, LOCATION, TAG
//----------------

exports.getGroupAndTagAndLocation = (req, res) => {
  db.collection("screams")
    .orderBy("likeCount", "desc")
    .where('groupName', '==', req.params.groupName)
    .where('tag', '==', req.params.tag)
    .where('location', '==', req.params.location)
    .limit(35)
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
          location: doc.data().location,
          groupName:doc.data().groupName,
          tag: doc.data().tag,
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//----------------
//GET HEALTHSHOT GROUP, LOCATION
//----------------

exports.getGroupAndLocation = (req, res) => {
  db.collection("screams")
    .orderBy("likeCount", "desc")
    .where('groupName', '==', req.params.groupName)
    .where('location', '==', req.params.location)
    .limit(35)
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
          location: doc.data().location,
          groupName:doc.data().groupName,
          tag: doc.data().tag,
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//============================================================================================================================
/*
.__   __.  ___________    __    ____    .___  ___.  _______ .___________. __    __    ______    _______       _______.
|  \ |  | |   ____\   \  /  \  /   /    |   \/   | |   ____||           ||  |  |  |  /  __  \  |       \     /       |
|   \|  | |  |__   \   \/    \/   /     |  \  /  | |  |__   `---|  |----`|  |__|  | |  |  |  | |  .--.  |   |   (----`
|  . `  | |   __|   \            /      |  |\/|  | |   __|      |  |     |   __   | |  |  |  | |  |  |  |    \   \    
|  |\   | |  |____   \    /\    /       |  |  |  | |  |____     |  |     |  |  |  | |  `--'  | |  '--'  |.----)   |   
|__| \__| |_______|   \__/  \__/        |__|  |__| |_______|    |__|     |__|  |__|  \______/  |_______/ |_______/   
*/
//============================================================================================================================

//----------------
//POST A HEALTHSHOT
//----------------

exports.postOneHealthshot = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
    location: req.body.location,
    groupName:req.body.groupName,
    tag: req.body.tag,
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      res.json(resScream);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

