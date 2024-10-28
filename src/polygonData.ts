const notificationArray = [
  {
    id: "66b5c282df2fd467ecf33325",
    likes: 0,
    dislikes: 0,
    topic: "WeatherWalay",
    severity: "low",
    type: "byPolygon",
    createdBy: "Tayyabshabbir070@gmail.com",
    createdOn: "8/9/2024, 12:17:22 PM",
    hyper_link: "https://weatherwalay.com",
    audioFile: "public/recordings/notification_1723187841985.m4a",
    body: {
      generic: {
        English: {
          title: "Jhelum (Test)",
          text: "Hello",
        },
      },
      profileBasedAlert: [
        {
          categoryId: "66a7429495e491eca1dfdfcc",
          subCategoryId: [
            {
              id: "66b088226b917c8e9c3a4516",
              English: {
                title: "Jhelum (Test)",
                text: "Hello",
              },
            },
          ],
        },
      ],
    },
    polygon: [
      { lat: 32.96097330775583, lng: 73.74641418457033 },
      { lat: 32.95348337867726, lng: 73.79722595214845 },
      { lat: 32.87797252526152, lng: 73.80065917968751 },
      { lat: 32.87508915559727, lng: 73.66950988769533 },
      { lat: 32.94829767131077, lng: 73.66607666015626 },
    ],
  },
];

export default notificationArray;
