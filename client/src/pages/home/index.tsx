const logout = () => {
  if (confirm('logging out ? ')) {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export default function Home() {
  return (
    <div>
      <h1>Welcome to the application.</h1>
      <button onClick={logout}>Logout !</button>
    </div>
  );
}
