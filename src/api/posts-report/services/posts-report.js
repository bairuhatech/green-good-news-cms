module.exports = {
  postsReport: async () => {
    try {
      const news = await strapi.entityService.findOne(
        "api::all-new.all-new",
        24,
        {
          fields: ["id", "head", "title", "body", "image", "likes"],
        }
      );
      return news;
    } catch (err) {
      return err;
    }
  },
  addLike: async (id) => {
    const news = await strapi.entityService.findOne(
      "api::all-new.all-new",
      id,
      {
        fields: ["id", "head", "title", "body", "image", "likes"],
      }
    );
    let likes;
    if (news.likes) {
      likes = Number(news.likes) + 1;
    } else {
      likes = 1;
    }

    const updatedNews = await strapi.entityService.update(
      "api::all-new.all-new",
      id,
      {
        data: {
          likes: likes,
        },
      }
    );
    return updatedNews;
  },
  markSaved: async (id) => {
    const news = await strapi.entityService.findOne(
      "api::all-new.all-new",
      id,
      {
        fields: ["id", "saved"],
      }
    );

    let saved;
    if (news.saved) {
      saved = Number(news.saved) + 1;
    } else {
      saved = 1;
    }

    const updatedNews = await strapi.entityService.update(
      "api::all-new.all-new",
      id,
      {
        data: {
          saved: saved,
        },
      }
    );

    return updatedNews;
  },
  createPolls: async (data) => {
    const polls = await strapi.db
      .query("api::poll.poll")
      .create(data.questions);

    const pollsOptions = data.options.map(async (item, index) => {
      item["poll_id"] = polls.id;
      let obj = {
        data: item,
      };
      const options = await strapi.db
        .query("api::poll-option.poll-option")
        .create(obj);
      return options;
    });

    return [polls, pollsOptions];
  },
  getPolls: async (data) => {
    const polls = await strapi.db.query("api::poll.poll").findOne({
      where: { isActive: true },
      populate: { poll_options: true },
    });
    return polls;
  },
  makeVisible: async (id) => {
    const data = await strapi.db.query("api::poll.poll").updateMany({
      where: {
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
    const polls = await strapi.entityService.update("api::poll.poll", id, {
      data: {
        isActive: true,
      },
    });
    return polls;
  },
  addVote: async (id) => {
    const polls = await strapi.entityService.findOne(
      "api::poll-option.poll-option",
      id,
      {
        fields: ["vote"],
      }
    );
    const updatedPolls = await strapi.entityService.update(
      "api::poll-option.poll-option",
      id,
      {
        data: {
          vote: polls.vote + 1,
        },
      }
    );
    return updatedPolls;
  },
  sendNotification: async (data) => {
    const notification = strapi.notification.sendNotification(data.token, {
      notification: {
        title: data.title,
        body: data.body,
        image: data.image,
      },
    });
    return data;
  },
  sendGroupNotification: async ({ tagsArray, title, body, image }) => {
    strapi.notification.sendNotificationToTopic(tagsArray, {
      notification: {
        title: title,
        body: body,
        image: image,
      },
    });
    return { tagsArray, title, body, image };
  },
  createNews: async (data) => {
    const obj = {
      title: data.data.title,
      body: data.data.body,
      image: data.data.image,
      token: data.data.token,
    };
    const news = await strapi.db.query("api::all-new.all-new").create(data);
    const array = data?.data?.tagsArray.split("%");
    for (const item of array) {
      if (item != "") {
        await module.exports.sendGroupNotification({
          ...obj,
          tagsArray: item,
        });
      }
    }
    // await module.exports.sendGroupNotification(obj);
    return news;
  },
  createUser: async (data) => {
    let verifiedUser;
   const hashPassword = await strapi.service("admin::auth").hashPassword(data.password);
    let obj = {
      data: {
        username: data.username,
        email: data.email,
        phone_number: data.phone_number,
        password: hashPassword,
        role: data.role,
        blocked: false,
        confirmed: true,
      },
    };
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .create(obj);
    if (user) {
      verifiedUser = await strapi.authentication.createNewUser(data);
    }
    return {
      ...user,
      google_verified: verifiedUser ? true : false,
    };
  },
  getusers : async () => {
    const user =  await strapi.db.query("plugin::users-permissions.user").findMany({
      populate: { role: true,
                  all_news: true },
    } 
    )
    return user
  },
  deleteuser : async (id) =>{
   const deleteuser = await strapi.entityService.delete("plugin::users-permissions.user", id);
   return deleteuser
  },
  generateOTP: (length) => {
    const charset =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let otp = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }
    return otp;
  },
  userLogin: async (data) => {
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({ where: { email: data.email }, populate: { role: true },})
    const otp = module.exports.generateOTP(6)
    let validPassword
    let lock
    if(user){
       validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(data.password, user.password);
      if (validPassword) {
        const update = await strapi.entityService.update(
          "plugin::users-permissions.user",
          user.id,
          {
            data: {
              hashed_key: otp,
            },
          }
        );
        await strapi.plugin('email').service('email').send({
          to: data.email,
          from: 'irshad@bairuhatech.com',
          subject: `Hi ${data.email}`,
          text: `Hi ${data.email}`,
          html: `<h4>Your OTP : ${otp}</h4>`,
        });
      }
      if(!validPassword){
        lock = strapi.entityService.update(
          "plugin::users-permissions.user",
            user.id,
            {
             data: {
                  attempts: (user.attempts || 0) + 1,
                  isLocked: user.attempts >= 3 ? true : false ,
                },
            }
      );
      }
    }
    let res = {
      ...user,
      status: user && validPassword ? 200 :  404,
      message: user && validPassword? "OTP send Successfully" :"Could'nt verify Credentials" 
    }
    return res;
  },
  verifyOTP: async (data) => {
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({ where: { email: data.email } });
    const validOTP = user.hashed_key === data.otp;
    let res = {
      status: validOTP ? 200 : 400,
      message: validOTP ? "Login success" : "could'nt verify the credentials",
    };
    return res;
  },


  updateUser: async (id, data) => {
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      id
    );
    const updateuser = await strapi.entityService.update(
      "plugin::users-permissions.user",
      id,
      {
        data: {
          username: data.username || user.username,
          email: data.email || user.email,
          phone_number: data.phone_number || user.phone_number,
          password: data.password || user.phone_number,
          role: data.role || user.role,
        },
      }
    );
    return updateuser;
  },
  addTrash: async (id) => {
    const news = await strapi.entityService.findOne("api::all-new.all-new", id);
    const updatedNews = await strapi.entityService.update(
      "api::all-new.all-new",
      id,
      {
        data: {
          is_deleted: true,
          publishedAt: null,
        },
      }
    );
    return updatedNews;
  },
  getTrashedItems: async () => {
    const trashedNews = await strapi.query("api::all-new.all-new").findMany({
      where: {
        is_deleted: true,
      },
    });
    return trashedNews;
  },
  unTrash: async (id) => {
    const news = await strapi.entityService.findOne("api::all-new.all-new", id);
    const updateNews = await strapi.entityService.update(
      "api::all-new.all-new",
      id,
      {
        data: {
          is_deleted: false,
          publishedAt: new Date(),
        },
      }
    );
    return updateNews;
  },
};
