import StudyMastery from "@/components/StudyMastery"
import StudyDisplay from "@/components/StudyDisplay";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
const questions = ["what is the capital of poland", "i hate school", "a", "b", "c", "d"]

export default function Results({ data }) {
    const router = useRouter();
    const { uuid } = router.query;
    const [paragraphData, setParagraphData] = useState( []);
    const [paragraphs, setParagraphs] = useState([]);
    let [insights, setInsights] = useState([]);
    const [percent, setPercent] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const localStorageData = localStorage.getItem('sessions');
            if (localStorageData) {
                const data = JSON.parse(localStorageData)[uuid]?.values || [];
                const paragraphs = data.map((p) => p.original);
                const percent = localStorage.getItem('percent');
                insights = JSON.parse(localStorage.getItem("UserInfo"));
                insights.push("HAHAHAHA XD :)");
                localStorage.setItem("UserInfo", JSON.stringify(insights)); 
                // console.log(localStorage.getItem("sessions"));
                let totalTalks = JSON.parse(localStorage.getItem("sessions"));
                let chats = [];
                for(let i in totalTalks){
                    // console.log(i);
                    // console.log(totalTalks[i])
                    // totalTalks[i] is an array of the paragraphs\
                    // console.log(totalTalks[i]["values"]);
                    let values = totalTalks[i]["values"];
                    for(let j =0; j<values.length; j++){
                        chats.push([])
                        //console.log(values[j]);
                        chats[j].push(values[j]["original"]);
                        chats[j].push("summary, values[j][\"summary\"]");
                        //console.log(chats[j]["answers"])
                        if(values[j]["answers"] != null){
                            for(let k = 0; k<(values[j]["answers"]).length; k++){
                                chats[j].push(values[j]["questions"][k]);
                                chats[j].push(values[j]["answers"][k]);
                            }
                        }
                    }
                    console.log(chats)
                }
                localStorage.setItem("UserChats", JSON.stringify(chats));
                let prompt = "Based on the text: \"" + chats[k][0];
                let A = true;
                prompt+= " User A and User B had this conversation:\n";
                for(let x = 2; x<chats[k].length; x++){
                    if(A){
                        prompt+= "\nA: ";
                    }
                    else{
                        prompt+="\n B: ";
                    }
                    A = !A;
                    prompt += chats[k][x];
                }
                prompt += "Please give me User B\'s language preferences as a numbered list.";
                console.log(prompt);
                const response = await fetch('/api/makeprofile', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      prompt: prompt
                    })
                  });
                const profile = await response.json();
                console.log(profile);
                setInsights(insights);
                setParagraphs(paragraphs);
                setParagraphData(data);
                setPercent(percent)
            }
        };
        fetchData();
    }, [uuid]);

    // if (!paragraphData || !paragraphs) {
    //     return <div>Loading...</div>;
    // }

    return <StudyDisplay uuid={uuid} insights = {insights} percent = {percent} paragraphs = {paragraphs}/>;
}
