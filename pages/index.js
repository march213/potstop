import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { web3 } from '../lib/web3';

import Account from '../components/Account';
import EthName from '../components/EthName';
import Answer from '../components/Answer';
import AnswerForm from '../components/AnswerForm';

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

  const connect = async () => {
    const ethAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (ethAccounts.length > 0) {
      setAccounts(ethAccounts);
    }
  };

  useEffect(() => {
    if (accounts.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accounts]);

  useEffect(() => {
    let shouldLogin = true;
    const checkLoggedIn = async () => {
      const ethAccounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (ethAccounts.length > 0 && shouldLogin) {
        setAccounts(ethAccounts);
      }
    };

    // fetch the answers from the API
    let shouldFetchAnswers = true;
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('/api/answers');
        const json = await response?.json();

        if (json && shouldFetchAnswers) {
          setAnswers(json.answers);
          setIsLoading(false);
        }
      } catch (e) {
        // @TODO: handle error
      }
    };

    checkLoggedIn();
    fetchAnswers();

    // listen for changes in the accounts
    const handleAccoutsChange = (ethAccounts) => {
      setAccounts(ethAccounts);
    };

    window.ethereum.on('accountsChanged', handleAccoutsChange);

    return () => {
      shouldLogin = false;
      shouldFetchAnswers = false;
      window.ethereum.removeListener('accountsChanged', handleAccoutsChange);
    };
  }, []);

  return (
    <main>
      <header>
        <h1>Potstop</h1>

        <form>
          <input type="text" placeholder="Search" />
        </form>

        <Account accounts={accounts} isLoggedIn={isLoggedIn} connect={connect} />
      </header>

      <section className="question">
        <div className="main">
          <h3>Feedback forum</h3>
          <h2>Looking for feedback as a beginner</h2>
          <p>
            Hey everyone, I&apos;m a new potter, just 4 weeks into my journey, and I&apos;m looking to get some feedback
            on what I&apos;ve made so far. I&apos;m particularly interested in how to make rustic looking bowls and
            pots, and I&apos;d love to know what the best tools to use would be!
          </p>

          <div className="slides">
            <Image src="/image-1.jpg" width="600" height="800" quality={60} alt="" />
            <Image src="/image-2.jpg" width="600" height="800" quality={60} alt="" />
            <Image src="/image-3.jpg" width="600" height="800" quality={60} alt="" />
            <Image src="/image-4.jpg" width="600" height="800" quality={60} alt="" />
          </div>
        </div>
        <div className="meta">
          {/* EthName */}
          <div className="eth-name">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ipfs.io/ipfs/QmbctVN8tPaDLiLysVDwThf7JTJhMejbSypZ4a3v5H2G3a"
              alt="Avatar of riklomas.eth"
            />
            <div className="name">
              <span className="primary">riklomas.eth</span>
              <span className="secondary">0xb25bf3...aaf4</span>
            </div>
          </div>
          {/* end EthName */}
        </div>
      </section>

      <section className="answers">
        {isLoading ? <div className="loading">Loading the answers...</div> : null}
        {!isLoading && answers?.length
          ? answers?.map((answer, index) => (
              <Answer
                key={`${answer.answerId}-${index}`}
                number={index + 1}
                answer={answer}
                accounts={accounts}
                isLoggedIn={isLoggedIn}
              />
            ))
          : null}
        {!isLoading ? <AnswerForm accounts={accounts} setAnswers={setAnswers} isLoggedIn={isLoggedIn} /> : null}
      </section>

      <Head>
        <title>Looking for feedback as a beginner – Feedback forum – Potstop </title>
        <meta property="og:title" content="Looking for feedback as a beginner on Potstop" />
        <meta property="og:description" content="This is a project on the SuperHi Crypto + Web3 for Creatives course" />
        <meta property="og:image" content="/social.png" />
      </Head>
    </main>
  );
}
