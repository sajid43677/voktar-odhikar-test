import { useState } from "react";

export default function NumberAnalyzer() {
  const [number, setNumber] = useState("");
  const [results, setResults] = useState({ isOddEven: "", isPrime: "" });

  const analyzeNumber = (inputNumber) => {
    const num = parseInt(inputNumber, 10);

    const oddEvenResult = num % 2 === 0 ? "Even" : "Odd";
    const primeResult = isNumberPrime(num) ? "Prime" : "Not Prime";

    setResults({ isOddEven: oddEvenResult, isPrime: primeResult });
  };

  const isNumberPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    let val = document.getElementsByClassName("inp")[0].value;
    console.log(val);
    setNumber(val);
    analyzeNumber(val);
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Odd/Even</th>
              <th>Prime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form>
                  <input
                    className="inp"
                    //value={number}
                    // onChange={(e) => setNumber(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                  {/* <button type="button" onClick={() => analyzeNumber(number)}>
                    Analyze
                  </button> */}
                </form>
              </td>
              <td>{results.isOddEven}</td>
              <td>{results.isPrime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
