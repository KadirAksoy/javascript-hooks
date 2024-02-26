import "./App.css";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";

function App() {
  // bileşenler arasında veri depolamak ve güncellemek için durum kullanır.
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  //useEffect, React'ta bir bileşenin yaşam döngüsüne ve durum değişikliklerine tepki vermek için kullanılan bir başka hooks'tur. useEffect fonksiyonu, bileşenin her render işleminden sonra belirli bir etki (side effect) oluşturmak veya temizlemek için kullanılır.
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  //useContext, React'ta bir bağlamı (context) kullanarak değerlere erişim sağlamak için kullanılan bir hooks'tur. Bağlam, bir React uygulamasında verilerin belirli bir ağaç yapısı içinde paylaşılmasını sağlayan bir mekanizmadır. useContext hooks'u, bir bağlamın içinde tanımlanan değerlere erişim sağlamak için kullanılır.
  // Renk bağlamı oluşturulur.
  const ColorContext = createContext();

  // Renk bağlamının sağladığı Provider bileşeni oluşturulur.
  const ColorProvider = ({ children }) => {
    // Başlangıçta kullanılacak olan renk state'i tanımlanır.
    const [color, setColor] = useState("lightblue");

    // Renk bağlamının içinde paylaşılacak değerler belirlenir.
    const colorValues = {
      color,
      changeColor: (newColor) => setColor(newColor),
    };

    return (
      <ColorContext.Provider value={colorValues}>
        {children}
      </ColorContext.Provider>
    );
  };

  // Renk bağlamını kullanacak bir bileşen
  const ColoredBox = () => {
    // Renk bağlamındaki değerlere erişim sağlamak için useContext hooks'u kullanılır.
    const { color, changeColor } = useContext(ColorContext);

    return (
      <div style={{ backgroundColor: color, padding: "20px", margin: "10px" }}>
        <p>Current Color: {color}</p>
        <button onClick={() => changeColor("lightblue")}>Light Blue</button>
        <button onClick={() => changeColor("lightgreen")}>Light Green</button>
        <button onClick={() => changeColor("lightcoral")}>Light Coral</button>
      </div>
    );
  };

  //useRef, React'ta referans oluşturmak ve bu referansları kullanarak DOM elementlerine veya diğer React öğelerine doğrudan erişim sağlamak için kullanılan bir hooks'tur. Genellikle, bir bileşenin yaşam döngüsü boyunca değişmeyen bir değeri takip etmek veya bir DOM elementine erişim sağlamak amacıyla kullanılır.
  const inputRef = useRef(null);

  function handleClick2() {
    inputRef.current.focus();
  }

  //useMemo, React'ta performans optimizasyonu için kullanılan bir hooks'tur. Bu hooks, hesaplaması maliyetli olan bir değeri önbelleğe almak (memoize etmek) ve sadece bağımlılıklarının değiştiği durumlarda bu değeri yeniden hesaplamak amacıyla kullanılır.

  function Fib({ n }) {
    // Fibonacci sayısını hesaplamak için bir fonksiyon
    const calculateFibonacci = (num) => {
      if (num <= 1) return num;
      return calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
    };

    // useMemo hooks'u ile hesaplama maliyeti yüksek Fibonacci değerini önbelleğe alıyoruz.
    const fibValue = useMemo(() => {
      console.log(`Calculating Fibonacci for ${n}`);
      return calculateFibonacci(n);
    }, [n]); // Sadece 'n' değiştiğinde değeri tekrar hesapla.

    return (
      <div>
        <p>
          Fibonacci value for {n}: {fibValue}
        </p>
      </div>
    );
  }

  const [number, setNumber] = useState(1);

  //useCallback, React'ta performans optimizasyonu için kullanılan bir hooks'tur. Bu hooks, bir işlevin referansını bellekte saklar ve sadece bağımlılıkları değiştiğinde yeni bir referans oluşturur. useCallback sayesinde, bir işlevin her render işlemi sırasında tekrar oluşturulmasını önleyebilir ve gereksiz re-render işlemlerini engelleyebilirsiniz.
  const [count2, setCount2] = useState(0);

  // useCallback kullanarak işlevi önbelleğe alıyoruz.
  const handleClick3 = useCallback(() => {
    // count state'ine bağımlı bir işlev
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <ColorProvider>
      <div>
        <h1>Count: {count}</h1>
        <button onClick={handleClick}>Increase Count</button>

        <ColoredBox />

        <input ref={inputRef} />
        <button onClick={handleClick2}>Focus Input</button>
        <Fib n={number} />
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />

        <p>Count: {count2}</p>
        {/* useCallback ile önbelleğe alınmış işlevi kullanma */}
        <button onClick={handleClick3}>Increment Count</button>
      </div>
    </ColorProvider>
  );
}

export default App;
