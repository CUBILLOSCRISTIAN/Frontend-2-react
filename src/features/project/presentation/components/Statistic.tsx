interface StatisticProps {
  label: string;
  value: string | number;
}

export const Statistic = ({ label, value }: StatisticProps) => {
  return (
    <div className="text-center">
      <h6 className="text-2xl font-bold text-teal-accent-400">{value}</h6>
      <p className="text-2xl font-bold">{label}</p> 
    </div>
  );
};
