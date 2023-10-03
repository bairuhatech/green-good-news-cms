const moment = require("moment");
module.exports = {
  // "*/1 * * * *": async () => {
  //   try {
  //     const branch = await strapi.db.query("api::branch.branch").findMany({
  //       where: {
  //         published_at: null,
  //         // publish_at: { $gt: new Date() },
  //       },
  //     });
  //     let currentdate = new Date();
  //     currentdate.setSeconds(0);
  //     currentdate.setMilliseconds(0);
  //     let Fcurrentdate = moment(currentdate).utcOffset("+0000", true);
  //     let newFcurrentdate = new Date(Fcurrentdate);
  //     branch.map(async (item) => {
  //       const toPublishdate = moment(item.publish_at).utcOffset("+0000", true);
  //       const newtoPublishdate = new Date(toPublishdate);
  //       newtoPublishdate.setSeconds(0);
  //       newtoPublishdate.setMilliseconds(0);
  //       if (newFcurrentdate.toISOString() == newtoPublishdate.toISOString()) {
  //         const updated = await strapi.entityService.update(
  //           "api::branch.branch",
  //           item.id,
  //           {
  //             data: {
  //               publishedAt: new Date(),
  //             },
  //           }
  //         );
  //         console.log(updated)
  //       } else {
  //         console.log("couldn't find any records");
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  "*/1 * * * *": async () => {
    try {
      let currentdate = new Date();
      currentdate.setSeconds(0);
      currentdate.setMilliseconds(0);
      let Fcurrentdate = moment(currentdate).utcOffset("+0000", true);
      let newFcurrentdate = new Date(Fcurrentdate);
      const news = await strapi.db.query("api::all-new.all-new").findMany({
        where: {
          published_at: null,
          // publish_at: { $lt: newFcurrentdate },
        },
      });
      news.map(async (item) => {
        const toPublishdate = moment(item.publish_at).utcOffset("+0000", true);
        const newtoPublishdate = new Date(toPublishdate);
        newtoPublishdate.setSeconds(0);
        newtoPublishdate.setMilliseconds(0);
        if (newFcurrentdate.toISOString() == newtoPublishdate.toISOString()) {
          const updated = await strapi.entityService.update(
            "api::all-new.all-new",
            item.id,
            {
              data: {
                publishedAt: new Date(),
              },
            }
          );
          console.log(updated);
        } else {
          console.log("couldn't find any records");
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
