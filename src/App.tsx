import "./App.scss";
import { useState } from "react";
import { questions } from "./questions";
import { env } from "./constants/enviorment";

export type MessagesProps = {
  role: string;
  content: string;
};

export type RequestDataProps = {
  model: string;
  messages: MessagesProps[];
  temperature: number;
};

export interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
}

export interface Menu {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
  total_calories: number;
  total_protein: number;
  summary: string;
  note: string | null;
}

const fetchData = async (requestData: RequestDataProps): Promise<any> => {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey: string = env.VITE_APP_OPENAI_API_KEY as string;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const result = await response.json();
    return result;
    // Process the result as needed
  } catch (error) {
    console.error("Error:", error);
  }
};

function App() {
  const [data, setData] = useState<any>(null);
  const [result, setResult] = useState<Menu | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (data: any) => {
    if (!data || loading) {
      return;
    }
    const requestData: RequestDataProps = {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `
          Your task is to provide a personalized diet plan based on the given data. The data should be in JSON format, including four parts: breakfast, lunch, dinner, and snacks. Additionally, please include information on calorie and protein intake, description (Max 30 words). Aim to provide a wide variety of options for each meal. it should also total calorie intake and total protein intake.The given data is shown inside triple backticks.
         

          Please follow the instructions below:

          1: The output should consist only of complete JSON data.
          2: Go through the data and display the output accordingly. If the user has specified a preference for only three meals, show dinner, lunch, and breakfast.
          3: give a summary of entire diet plan (Max 50 words) generated and it into final result in jsonData"
          4: data should be structured in below given format Meal and should just be JSON Data.
          5: if reply for professional guidance is set to no then give a note telling that its better to get professional guidance from a doctor (proofread and phrase this sentence better before adding it into the data) else it the reply is set to yes then return null and add it json data.
          6: The output should consist only of complete JSON data.
 
          interface Menu {
            breakfast: Meal[];
            lunch: Meal[];
            dinner: Meal[];
            snacks: Meal[];
            total_calories: number;
            total_protein: number;
            summary: string;
            note:string|null;
          }

          interface Meal {
            name: string;
            description: string;
            calories: number;
            protein: number;
          }
          

          Note: I made a slight modification to the third instruction to clarify that the summary is about the targeted individual for whom the diet plan is structured.
          data='''${JSON.stringify(data)}'''
           `,
        },
      ],
      temperature: 0,
    };
    setLoading(true);
    setResult(null);
    fetchData(requestData)
      .then((res) => {
        if (
          res &&
          res.choices &&
          res.choices.length > 0 &&
          res.choices[0].message.content
        ) {
          console.log(res.choices[0].message.content, "sss");
          if (res.choices[0].message.content)
            setResult(JSON.parse(res.choices[0].message.content));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log({ result }, "ssss");

  return (
    <div className="app">
      <div className="body">
        {questions.map((question, index) => (
          <div className="question-container" key={index}>
            <div className="question">{question.question}</div>

            {question.options.length > 0 && (
              <select
                className="select"
                name="question"
                id="question"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setData(
                      data
                        ? { ...data, [question.key]: e.target.value }
                        : { [question.question]: e.target.value }
                    );
                  }
                }}
              >
                <option value="">Select an option</option>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <div className="question-container submit-button">
          <div
            className="submit"
            onClick={() => {
              handleSubmit(data);
            }}
          >
            {loading ? "Loading..." : "Submit"}
          </div>
        </div>
        {result && (
          <div
            className="summary"
            style={{
              padding: "30px 0",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {result.summary}
          </div>
        )}

        <div className="table-container ">
          {result && (
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>Meal</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Calories</th>
                  <th>Protein</th>
                </tr>
              </thead>
              <tbody>
                {result?.breakfast &&
                  result?.breakfast?.length > 0 &&
                  result?.breakfast?.map((item: any, index: number) => (
                    <tr>
                      {index === 0 && (
                        <th rowSpan={result?.breakfast?.length}> Breakfast</th>
                      )}
                      {item.name && <td>{item.name}</td>}
                      {item.description && <td>{item.description}</td>}
                      {item.calories && <td>{item.calories}</td>}
                      {item.protein && <td>{item.protein}</td>}
                    </tr>
                  ))}
                {result?.lunch &&
                  result?.lunch?.length > 0 &&
                  result?.lunch?.map((item: any, index: number) => (
                    <tr>
                      {index === 0 && (
                        <th rowSpan={result?.lunch?.length}> lunch</th>
                      )}
                      {item.name && <td>{item.name}</td>}
                      {item.description && <td>{item.description}</td>}
                      {item.calories && <td>{item.calories}</td>}
                      {item.protein && <td>{item.protein}</td>}
                    </tr>
                  ))}

                {result?.dinner &&
                  result?.dinner?.length > 0 &&
                  result?.dinner?.map((item: any, index: number) => (
                    <tr>
                      {index === 0 && (
                        <th rowSpan={result?.dinner?.length}> Dinner</th>
                      )}
                      {item.name && <td>{item.name}</td>}
                      {item.description && <td>{item.description}</td>}
                      {item.calories && <td>{item.calories}</td>}
                      {item.protein && <td>{item.protein}</td>}
                    </tr>
                  ))}

                {result?.snacks &&
                  result?.snacks?.length > 0 &&
                  result?.snacks?.map((item: any, index: number) => (
                    <tr>
                      {index === 0 && (
                        <th rowSpan={result?.snacks?.length}> Snacks</th>
                      )}
                      {item.name && <td>{item.name}</td>}
                      {item.description && <td>{item.description}</td>}
                      {item.calories && <td>{item.calories}</td>}
                      {item.protein && <td>{item.protein}</td>}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {result && result?.total_calories && (
            <p>
              <strong>Daily Calorie Intake:</strong> {result?.total_calories}
            </p>
          )}
          {result && result?.total_protein && (
            <p>
              <strong>Daily Protein Intake:</strong> {result?.total_protein}
            </p>
          )}
          {result && result?.note && (
            <p
              style={{
                color: "red",
              }}
              className="error"
            >
              Note:- {result?.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
