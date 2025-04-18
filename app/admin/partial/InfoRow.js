export default function InfoRow({ label, value }) {
    return (
      <div className="font-16 flex justify-between items-center py-2 2xl:py-2.5 border-b border-gray-200">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-700">{value}</span>
      </div>
    );
  }