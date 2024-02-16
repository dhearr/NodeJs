const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "test_db";

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    //// pilih database
    const db = client.db(dbName);

    //// menambahkan 1 data ke dalam collection mahasiswa
    // const result = await db.collection("mahasiswa").insertOne({
    //   nama: "zoro",
    //   email: "zoro@gmail.com",
    // });

    //// menambahkan lebih dari 1 data ke dalam collection mahasiswa
    // const result = await db.collection("mahasiswa").insertMany([
    //   {
    //     nama: "sanji",
    //     email: "sanji@gmail.com",
    //   },
    //   {
    //     nama: "nami",
    //     email: "nami@gmail.com",
    //   },
    // ]);

    // //// menampilkan semua data yang ada di collection mahasiswa
    // const result = await db.collection("mahasiswa").find().toArray();

    //// menampilkan data berdasarkan lriteria yang ada di collection mahasiswa
    // const result = await db
    //   .collection("mahasiswa")
    //   .find({ _id: new ObjectId("65cf7fec2a1fa5e7336b4b0b") })
    //   .toArray();

    //// update / mengubah data mahasiswa berdasarkan id
    // const result = await db.collection("mahasiswa").updateOne(
    //   {
    //     _id: new ObjectId("65cf7fec2a1fa5e7336b4b0b"),
    //   },
    //   {
    //     $set: {
    //       nama: "zoro",
    //     },
    //   }
    // );

    //// delete / menghapus 1 data mahasiswa berdasarkan id
    // const result = await db.collection("mahasiswa").deleteOne({
    //   _id: new ObjectId("65cf81584540d860a18324b2"),
    // });

    //// delete / menghapus lebih dari  data mahasiswa
    const result = await db.collection("mahasiswa").deleteMany({
      nama: "zoro",
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
main();
