import React from 'react';
import { useState, useRef } from 'react';
import styles from "../styles/questions.module.css";
import Image from 'next/image';
import chatBotImg from "../../images/chatbot.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface QuestionResponses {
    role: string;
    content: string;
}

export default function QuestionsSection({ slug }: { slug: string }) {
    const questionSectionRef = useRef<HTMLDivElement | null>(null);

    const housingInfo = useRef(JSON.parse(slug))

    const chatlog = useRef([
        {
            "role": "system", 
            "content": `
              You are a helpful assistant that answers questions about Housing in a Real Estate Website,
              here are some info about the particular property you will be asked questions about, it is described as ${housingInfo.current.description},
              address is ${housingInfo.current.address}, sqft is ${housingInfo.current.sqft}, bedrooms are ${housingInfo.current.bed}, baths are ${housingInfo.current.bath},
              and price is ${housingInfo.current.price}
            `,
        },
    ])

    const [aiQuestion, setAiQuestion] = useState("");

    const [questionsAsked, setQuestionsAsked] = useState<QuestionResponses[]>([]);

    const [answerLoading, setAnswerLoading] = useState(false);

    const [aiTypyResponse, setAiTypyResponse] = useState("last message of AI");

    const [responseComplete, setResponseComplete] = useState(true);

    function dynamicallyTypeAiResponse(letter: string, index: number=0, lastIndex: number){
      setTimeout(() => {
        if(letter !== "*"){
          setAiTypyResponse((prevResponse)=>
            prevResponse += letter
          )
        }

        if(index == lastIndex){
          setResponseComplete(true);
        }
      }, 50 * index);
    }
  
    const askAiQuestion = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        setResponseComplete(false);

        if(aiQuestion !== ""){
          setAnswerLoading(true);

          const previous_question = aiQuestion;

          setAiQuestion("");

          setAiTypyResponse("");

          const oldQuestions = [...questionsAsked];

          oldQuestions.push({"role": "user", "content": previous_question});

          setQuestionsAsked(oldQuestions);

          // const formdata = new FormData();
          
          chatlog.current.push({"role": "user", "content": previous_question});

          // formdata.append("question", JSON.stringify(chatlog.current));

          const requestOptions = {
            method: 'GET',
          };

          const res = await fetch(`https://restaurant-hosting.vercel.app/food/askAIQuestion?question=${JSON.stringify(chatlog.current)}`, requestOptions);

          if(res.ok){
            const data = await res.json();

            oldQuestions.push({"role": "assistant", "content": data["response"]})

            setQuestionsAsked(oldQuestions);

            chatlog.current.push({"role": "assistant", "content": data["response"]});

            setAnswerLoading(false);

            for(let i = 0; i < oldQuestions[oldQuestions.length - 1].content.length; i ++){
              dynamicallyTypeAiResponse(oldQuestions[oldQuestions.length - 1].content[i], i, oldQuestions[oldQuestions.length- 1].content.length - 1)
            }
          }else{
            setAnswerLoading(false);

            setResponseComplete(true);

            alert("An error occurced, please try again");
          }
        }
    }

    return (
      <div className={styles.chat_and_ai_button_container}>
        <div ref={questionSectionRef} className={`${styles.questionSection} questionSection`}>
          <h2 style={{textAlign: "center"}}>AI Assistant</h2>

          <form onSubmit={(e)=>{
              askAiQuestion(e).catch(()=>{
                setAnswerLoading(false);

                setResponseComplete(true);

                alert("An error occurced, please try again");
              })
            }} method='post' className={`${styles.message_content_section} message_content_section`}>
            <div className={`${styles.chat_window} chat_window`}>
              <div className={`${styles.output} output`}>
                {
                    questionsAsked.length == 0 ?
                    <p className={styles.no_question}>Please ask any question to our helpful assistant</p>
                    :
                    questionsAsked.map((question, index)=>
                        <div key={index} className={styles.profile_container}>
                            {
                                question.role === "user" ?
                                <div className={`${styles.profile_pic} profile_pic`}>
                                  {question.content}
                                </div>
                                :
                                <>
                                  <div className={`${styles.profile_pic2} profile_pic2`}>
                                      <Image
                                        src={chatBotImg}
                                        alt='Profile Image'
                                        height={100}
                                        width={100}
                                      />
                                  </div>

                                  
                                  {
                                    questionsAsked.length - 1 !== index ?
                                    <p className={`${styles.response} response`}>
                                    {
                                      question.content
                                    }
                                    </p> :
                                    <p className={`${styles.response} response`}>
                                    {
                                      aiTypyResponse
                                    }
                                    <span className={`${
                                      !responseComplete ? styles.response2
                                      : ""
                                    }`}></span>
                                    </p>
                                  }
                                  
                                </>
                            }
                        </div>
                    )
                }
                {
                    answerLoading == true &&
                    <p className={styles.no_question}>Generating response...</p>
                }
              </div>
            </div>

            <div className={styles.message_compose_section}>
              <FontAwesomeIcon icon={faPaperclip} style={{cursor: "pointer"}}/>
              <input disabled={!responseComplete} value={aiQuestion} onChange={(e)=>{setAiQuestion(e.target.value)}} className={`${styles.message} message`} type="text" placeholder="Ask about property"/>
              <button className={styles.send}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </form>
        </div>

        <div className={`${styles.ai_button_container} ai_button_container`}>
          <p>AI Chat</p>
          <div onClick={()=>{
            if(questionSectionRef.current!.style.display == "none" || questionSectionRef.current!.style.display == ""){
              questionSectionRef.current!.style.display = "block";
            }else{
              questionSectionRef.current!.style.display = "none";
            }
          }} className={`${styles.ai_chat_button} ai_chat_button`}>
            <Image
              src={chatBotImg}
              alt='Chat Logo'
              height={100}
              width={100}
            />
          </div>
        </div>
      </div>
    )
}