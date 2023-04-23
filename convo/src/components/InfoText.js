import { Container } from "react-bootstrap";
import Head from 'next/head';
export default function InfoText() {
  return (
    <Container>
         <Head>
         <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Roboto+Mono:wght@100&display=swap"
          rel="stylesheet"
        />
        </Head>
      <h2 className="landing-text">
        <b>Convo speaks a language only you understand.</b>
      </h2>
      <div className="info-text">
        <p>Language is an inefficient means of communication.</p>
        <p>
          We struggle on a daily basis to try to use our words to accurately
          convey how we feel and what we think. Our ability to articulate and
          understand dictates the quality of our lives whether it's giving
          presentations at work, socializing with friends or communicating with
          loved ones.
        </p>
        <p>
          Everyone processes information and language differently. Some people
          are inspired by the prose of Hemingway and others love the poetry of
          Rupi Kaur.
        </p>
        <p>
          Convo is a tool that takes information whether it's a lecture,
          discussion, or story and translates it into the “native language” of
          the reader.
        </p>
        <p>
          Through conversations and monitoring the user's understanding, Convo
          discovers how to phrase information specifically for the user.
        </p>
      </div>
    </Container>
  );
}