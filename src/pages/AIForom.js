import React, { useEffect, useState } from 'react';
import userQuestions from '../assets/questions.json';
import '../styles/Aiforom.css';
import ProductCard from '../Product';

function SurveyForm() {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(-1);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setQuestions(userQuestions);
    setProducts([
      { id: 1, name: 'Lego Package', description: 'This is product 1', image: 'https://www.lego.com/cdn/cs/set/assets/blt61f68cd89d49cc06/11029_alt1.png',price : 50 ,isLiked: false,  },
      { id: 2, name: 'Chess', description: 'This is product 2', image: 'https://5.imimg.com/data5/PG/LD/CL/SELLER-14274915/magnetic-chess-game.jpg',price : 30 ,isLiked: false,  },
      { id: 3, name: 'Product 3', description: 'This is product 3', image: 'https://m.media-amazon.com/images/I/71x1TrqgSmL._AC_UF894,1000_QL80_.jpg',price : 20 ,isLiked: false,  },
    ]);
  }, []);

  const toggleLike = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    );
    setProducts(updatedProducts);

    const likedProduct = updatedProducts.find(product => product.id === id);

    if (likedProduct.isLiked) {
      setLikedProducts([...likedProducts, likedProduct]);
      setSnackbarMessage(`You have liked ${likedProduct.name}`);
    } else {
      setLikedProducts(likedProducts.filter(product => product.id !== id));
      setSnackbarMessage(`You have unliked ${likedProduct.name}`);
    }
    setSnackbarOpen(true);
  };

 

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(prevStep => prevStep + 1);
      setAnsweredCount(prevCount => prevCount + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
      setAnsweredCount(prevCount => prevCount - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="home ai-page">
      <div className="card-body">
        <div className="survey-content">
          {isFinished ? (
            <div className="products">
              <h1>According to your answers, we suggest you buy:</h1>
              <div className="grid-container">
                {products.map((product) => (
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
          ) : (
            step === -1 ? (
              <div className="text-center">
                <h1>Let's find the perfect gift for the child we're looking for</h1>
                <p>We will present you with 6 questions that you must answer so that artificial intelligence can assist you well.</p>
                <p>Sound good to you?</p>
                <button className="primary-button" onClick={() => setStep(0)}>Let's get started</button>
              </div>
            ) : (
              <div className="container text-center" id="questions">
                <div className="progress-bar">
                  <div className="progress-bar-inner" style={{ width: `${(answeredCount / questions.length) * 100}%` }}></div>
                  <span className="progress-label">{`${answeredCount} from ${questions.length} questions`}</span>
                </div>
                <div className="question-container">
                  <h3>{questions[step].title}</h3>
                  {questions[step].options.length > 0 ? (
                    <div className="options-group">
                      {questions[step].options.map(option => (
                        <label key={option.value} className="radio-label">
                          <input
                            type="radio"
                            name={`question-${questions[step].id}`}
                            value={option.value}
                            className="radio-input"
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
                  {step > 0 && (
                    <button className="secondary-button" onClick={handlePrev}>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  )}
                  {step < questions.length - 1 ? (
                    <button className="primary-button" onClick={handleNext}>
                      <i className="fas fa-arrow-left"></i>
                    </button>
                  ) : (
                    <button type='submit' className="success-button" onClick={handleFinish}>Finish</button>
                  )}
                </div>
              </div>
            )
          )}
          {/* Snackbar Component */}
          <div className={`snackbar ${snackbarOpen ? 'show' : ''}`}>
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
