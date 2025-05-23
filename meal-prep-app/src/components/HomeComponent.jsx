const HomeComponent = ({ userData }) => {
  return (
    <div className="p-6 bg-[#F5F5F5] rounded-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-[#4CAF50]">
        Hello, {userData.user_metadata?.username || userData.email}!
      </h2>
      <p className="mt-3 text-[#424242] text-opacity-70 text-base">
        Email: {userData.email}
      </p>
    </div>
  );
};

export default HomeComponent;
