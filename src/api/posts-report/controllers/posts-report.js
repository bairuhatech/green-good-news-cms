module.exports = {
  async postsReport(ctx, next) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .postsReport();
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async addLike(ctx, res, any) {
    try {
      let id = ctx.request.url.split("/")[3];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .addLike(id);
      return data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async markSaved(ctx, res, any) {
    try {
      let id = ctx.request.url.split("/")[3];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .markSaved(id);
      return data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async createPolls(ctx, res, any) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .createPolls(ctx.request.body);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async getPolls() {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .getPolls();
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async getusers() {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .getusers();
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async deleteuser(ctx) {
    try {
      let id = ctx.request.url.split("/")[3];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .deleteuser(id);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async makeVisible(ctx) {
    try {
      let id = ctx.request.url.split("/")[4];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .makeVisible(id);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async addVote(ctx, res, any) {
    try {
      let id = ctx.request.url.split("/")[3];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .addVote(id);
      return data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("Couldn't add Vote", { moreDetails: err });
    }
  },

  async sendNotification(ctx) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .sendNotification(ctx.request.body);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async sendGroupNotification(ctx) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .sendGroupNotification(ctx.request.body);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async createNews(ctx) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .createNews(ctx.request.body);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async createUser(ctx) {
    try {
            const data = await strapi
        .service("api::posts-report.posts-report")
        .createUser(ctx.request.body);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async userLogin(ctx) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .userLogin(ctx.request.body);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async verifyOTP(ctx) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .verifyOTP(ctx.request.body);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async addTrash(ctx) {
    try {
      let id = ctx.request.url.split("/")[3];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .addTrash(id);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async unTrash(ctx) {
    try {
      let id = ctx.request.url.split("/")[3];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .unTrash(id);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getTrashedItems() {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .getTrashedItems();
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async updateUser(ctx) {
    try {
      let id = ctx.request.url.split("/")[3];
      const data = await strapi
        .service("api::posts-report.posts-report")
        .updateUser(id,ctx.request.body);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};
