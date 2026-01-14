body {
  margin: 0;
  font-family: "Tahoma", sans-serif;
  background: #f5f5f5;
}

#app {
  max-width: 420px;
  margin: auto;
}

.page {
  display: none;
  height: 90vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.page.active {
  display: block;
}

.title {
  text-align: center;
  margin-top: 40%;
  color: #fff;
}

input {
  position: absolute;
  width: 70%;
  padding: 8px;
  font-size: 16px;
}

.check {
  width: 30px;
  height: 30px;
  border: 2px solid #555;
  position: absolute;
  cursor: pointer;
}

.check.active {
  background: green;
}

.quiz {
  background: #fff;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}

.quiz.correct {
  background: #c8f7c5;
}

.icon, .star, .fruit {
  font-size: 30px;
  cursor: pointer;
  position: absolute;
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
