import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const SortContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Bar = styled.div`
  height: ${props => props.height}px;
  width: 20px;
  background-color: #3498db;
  margin: 0 2px;
`;

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [sortedNumbers, setSortedNumbers] = useState([]);

  const handleInputChange = (e) => {
    const inputNumbers = e.target.value
      .split(',')
      .map((num) => (num.trim() === '' ? NaN : parseInt(num, 10)))
      .filter((num) => !isNaN(num));

    setNumbers(inputNumbers);
    setSortedNumbers([]);
  };

  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  };

  const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const handleSortClick = () => {
    const sorted = mergeSort(numbers.slice());
    setSortedNumbers(sorted);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter separated by commas"
        onChange={handleInputChange}
      />
      <Button onClick={handleSortClick}>Sort</Button>
      <SortContainer>
        {numbers.map((num, index) => (
          <Bar key={index} height={num * 5} />
        ))}
      </SortContainer>
      <SortContainer>
        {sortedNumbers.map((num, index) => (
          <Bar key={index} height={num * 5} />
        ))}
      </SortContainer>
    </Container>
  );
};

export default App;
