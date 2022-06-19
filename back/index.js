//Epxress
const express = require("express");
const app = express();
//CORS
const cors = require("cors");
//DB ORM
const models = require("./models");
//FILE
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
//SESSION + Redis
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
client.on("ready",()=>{
  console.log('ready');
})
client.on("error",(err)=>{
  console.log('error', err);
})

app.use(session({
  secret: "ingenie",
  store: new redisStore({
    client: client,
    logErrors: true
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge:2400*60*60}
}))

//Router
const auth = require("./routes/auth");

// const detectProduct = require("./helpers/detectProduct");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
//Auth
app.use('/auth',auth);

app.use("/uploads", express.static("uploads"));

app.get("/banners", (req, res) => {
  models.Banner.findAll({
    limit: 2,
  })
    .then((result) => {
      res.send({
        banners: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다");
    });
});

app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "name",
      "price",
      "createdAt",
      "seller",
      "imageUrl",
      "soldout",
    ],
  })
    .then((result) => {
      // console.log("PRODUCTS : ", result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("에러 발생");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller, imageUrl } = body;
  if (!name || !description || !price || !seller || !imageUrl) {
    res.status(400).send("모든 필드를 입력해주세요");
  }
  // detectProduct(imageUrl, (type) => {
  //   models.Product.create({ description, price, seller, imageUrl, name, type })
  //     .then((result) => {
  //       console.log("상품 생성 결과 : ", result);
  //       res.send({
  //         result,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       res.status(400).send("상품 업로드에 문제가 발생했습니다");
  //     });
  // });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 조회에 에러가 발생했습니다");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

app.post("/purchase/:id", (req, res) => {
  const { id } = req.params;
  models.Product.update(
    {
      soldout: 1,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((result) => {
      res.send({
        result: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.get("/products/:id/recommendation", (req, res) => {
  const { id } = req.params;
  models.Product.findOne({
    where: {
      id,
    },
  })
    .then((product) => {
      const type = product.type;
      models.Product.findAll({
        where: {
          type,
          id: {
            [models.Sequelize.Op.ne]: id,
          },
        },
      }).then((products) => {
        res.send({
          products,
        });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.listen(port, () => {
  console.log("쇼핑몰 서버가 돌아가고 있습니다");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러ㅠ");
      process.exit();
    });
});
