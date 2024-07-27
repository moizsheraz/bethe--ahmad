import React, { useEffect, useState } from "react";
import axios from "axios";
import userQuestions from "../assets/questions.json";
import "../styles/Aiforom.css";
import ProductCard from "../Product";
import productsData from "../assets/products.json";
import { useNavigate } from "react-router-dom";
// import loading from "../../src/assets/loading.gif";

function SurveyForm() {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(-1);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for AI generation
  const [selectedPriceRange, setSelectedPriceRange] = useState(""); // State for selected price range

  const firstQuestion = {
    id: 1,
    title: "What is Your Child's Age",
    options: [
      { value: "1-5", label: "1-5" },
      { value: "5-10", label: "5-10" },
      { value: "10-15", label: "10-15" },
      { value: "15-20", label: "15-20" },
    ],
  };

  useEffect(() => {
    setQuestions([firstQuestion, ...userQuestions]);
  }, []);

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };

  const toggleLike = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    );
    setProducts(updatedProducts);

    const likedProduct = updatedProducts.find((product) => product.id === id);

    if (likedProduct.isLiked) {
      setLikedProducts([...likedProducts, likedProduct]);
      setSnackbarMessage(`You have liked ${likedProduct.name}`);
    } else {
      setLikedProducts(likedProducts.filter((product) => product.id !== id));
      setSnackbarMessage(`You have unliked ${likedProduct.name}`);
    }
    setSnackbarOpen(true);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((prevStep) => prevStep + 1);
      setAnsweredCount((prevCount) => prevCount + 1);
    }
  };

  // const handlePrev = () => {
  //   if (step > 0) {
  //     setStep((prevStep) => prevStep - 1);
  //     setAnsweredCount((prevCount) => prevCount - 1);
  //   }
  // };
  const navigate = useNavigate();
  const handlePrev = () => {
    if (step <= 0) {
      navigate("/ai-help");
    } else {
      setStep((prevStep) => prevStep - 1);
      setAnsweredCount((prevCount) => prevCount - 1);
    }
  };
  const axiosOptions = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleFinish = async () => {
    setIsLoading(true); // Set loading state to true
    setIsFinished(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/suggest-products",
        answers,
        axiosOptions
      );
      const suggestedProductIds = response.data.suggestedProductIds
        .split(",")
        .map((id) => id.trim());

      const filteredProducts = productsData.filter((product) =>
        suggestedProductIds.includes(product.id.toString())
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage(
        "An error occurred while fetching product suggestions."
      );
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (!selectedPriceRange) return true;

    const [min, max] = selectedPriceRange.split("-").map(Number);
    return product.price >= min && product.price <= max;
  });

  return (
    <div className="home ai-page">
      <div className="card-body">
        <div className="survey-content">
          {isLoading ? (
            <div className="loading-spinner">
              <h2 style={{ color: "#304463" }}>AI is thinking..</h2>
            </div>
          ) : isFinished ? (
            <div className="products">
              <h1 style={{ color: "#304463" }}>
                According to your answers, we suggest you buy:
              </h1>
              <div className="price-filter">
                <label htmlFor="price-range">Filter by price range:</label>
                <select id="price-range" onChange={handlePriceRangeChange}>
                  <option value="">All</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-300">$200 - $300</option>
                </select>
              </div>
              <div className="grid-container">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                    isLiked={product.isLiked}
                    onLikeToggle={() => toggleLike(product.id)}
                  />
                ))}
              </div>
            </div>
          ) : step === -1 ? (
            <div className="text-center">
              <h1>
                Let's find the perfect gift for the child we're looking for
              </h1>
              <p>
                We will present you with 6 questions that you must answer so
                that artificial intelligence can assist you well.
              </p>
              <p>Sound good to you?</p>
              <button
                style={{ color: "#EBF4F6" }}
                className="primary-button"
                onClick={() => setStep(0)}
              >
                Let's get started
              </button>
            </div>
          ) : (
            <div className="container text-center" id="questions">
              <div className="progress-bar">
                <div
                  className="progress-bar-inner"
                  style={{
                    width: `${(answeredCount / questions.length) * 100}%`,
                  }}
                ></div>
                <span className="progress-label">{`${answeredCount} from ${questions.length} questions`}</span>
              </div>
              <div className="question-container">
                <h3>{questions[step].title}</h3>
                {questions[step].options.length > 0 ? (
                  <div className="options-group">
                    {questions[step].options.map((option) => (
                      <label key={option.value} className="radio-label">
                        <input
                          type="radio"
                          name={`question-${questions[step].id}`}
                          value={option.value}
                          className="radio-input"
                          onChange={handleAnswerChange}
                          required
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    className="textarea"
                    placeholder="Type your answer here..."
                    rows={7}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    required
                  ></textarea>
                )}
              </div>
              <div className="button-group">
                {step >= 0 && (
                  <button className="secondary-button" onClick={handlePrev}>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                )}
                {step < questions.length - 1 ? (
                  <button className="primary-button" onClick={handleNext}>
                    <i className="fas fa-arrow-left"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="success-button"
                    onClick={handleFinish}
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          )}
          <div className={`snackbar ${snackbarOpen ? "show" : ""}`}>
            <div className="snackbar-content">
              {snackbarMessage}
              <button id="close-btn" onClick={handleCloseSnackbar}>
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyForm;
