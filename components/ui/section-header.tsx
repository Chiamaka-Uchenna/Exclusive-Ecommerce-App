interface SectionHeaderProps {
  title: string
  subtitle?: string
  showViewAll?: boolean
  viewAllHref?: string
}

export default function SectionHeader({ title, subtitle, showViewAll = false, viewAllHref = "#" }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {subtitle && (
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-5 h-10 bg-red-500 rounded" />
            <span className="text-red-500 font-semibold">{subtitle}</span>
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      {showViewAll && (
        <a
          href={viewAllHref}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200"
        >
          View All
        </a>
      )}
    </div>
  )
}
