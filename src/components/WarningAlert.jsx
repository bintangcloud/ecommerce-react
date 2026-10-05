export default function WarningAlert({ message, show }) {
  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 animate-fade-in-down border border-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="text-sm font-semibold">{message}</span>
    </div>
  );
}