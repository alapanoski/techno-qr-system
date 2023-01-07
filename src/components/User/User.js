export default function User({ user }) {
  return (
    <div className="w-96 p-4 flex flex-col gap-4 overflow-y-scroll">
      <p className="text-3xl font-bold tracking-wide">Basic Details</p>
      <div className="flex flex-col gap-2 text-xl">
        <p>
          User Id: <strong>{user.user_id}</strong>
        </p>
        <p>
          RazorPay Id: <strong>{user.payment_id}</strong>
        </p>
        <p>
          Name: <strong>{user.name}</strong>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold tracking-wide">Food</p>
        <div className="flex flex-col justify-evenly gap-2">
          <p>Breakfast ✅</p>
          <p>Lunch ❌</p>
        </div>
      </div>
      <div className="flex flex-row gap-4 text-2xl">
        <p className="font-bold tracking-wide">Points 100</p>
      </div>
    </div>
  );
}
