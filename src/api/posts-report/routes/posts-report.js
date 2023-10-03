module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts-report",
      handler: "posts-report.postsReport",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/addLike/:id",
      handler: "posts-report.addLike",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/mark-saved/:id",
      handler: "posts-report.markSaved",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/createPolls",
      handler: "posts-report.createPolls",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/getPolls",
      handler: "posts-report.getPolls",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/polls/makeVisible/:id",
      handler: "posts-report.makeVisible",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/addVote/:id",
      handler: "posts-report.addVote",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/sendNotification",
      handler: "posts-report.sendNotification",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/sendGroupNotification",
      handler: "posts-report.sendGroupNotification",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/createNews",
      handler: "posts-report.createNews",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/createUser",
      handler: "posts-report.createUser",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/userLogin",
      handler: "posts-report.userLogin",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/getusers",
      handler: "posts-report.getusers",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/deleteuser/:id",
      handler: "posts-report.deleteuser",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/verifyOTP",
      handler: "posts-report.verifyOTP",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/trash/:id",
      handler: "posts-report.addTrash",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/unTrash/:id",
      handler: "posts-report.unTrash",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/getTrashedItems",
      handler: "posts-report.getTrashedItems",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/updateUser/:id",
      handler: "posts-report.updateUser",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
