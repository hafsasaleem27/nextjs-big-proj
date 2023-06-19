import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="A list of meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://hafsa:8ThDKkQ6jm7w8Y3C@cluster0.8uf0uos.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
