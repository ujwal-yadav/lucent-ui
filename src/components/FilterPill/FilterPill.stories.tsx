import type { Meta, StoryObj } from '@storybook/react';
import { FilterPill } from './FilterPill';
import { DateFilterPill } from './DateFilterPill';
import { useState } from 'react';
import { FilterIcon, StarIcon, SettingsIcon } from '../Icon';

const meta: Meta<typeof FilterPill> = {
  title: 'Components/FilterPill',
  component: FilterPill,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterPill>;

export const Default: Story = {
  args: {
    label: 'Segment',
    searchable: true,
    searchPlaceholder: 'Search...',
    options: [
      { value: 'mens-casual', label: 'New York City, United States of America' },
      { value: 'womens-wear', label: 'Womens Wear' },
    ],
  },
};

export const Countries: Story = {
  args: {
    label: 'Country',
    searchable: true,
    searchPlaceholder: 'Search...',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
      { value: 'au', label: 'Australia' },
      { value: 'br', label: 'Brazil' },
      { value: 'in', label: 'India' },
    ],
  },
};

export const WithSelectedItems: Story = {
  args: {
    label: 'Category',
    options: [
      { value: 'electronics', label: 'Electronics', checked: true },
      { value: 'clothing', label: 'Clothing' },
      { value: 'furniture', label: 'Furniture', checked: true },
      { value: 'books', label: 'Books' },
    ],
    searchable: true,
  },
};

export const ManyOptions: Story = {
  args: {
    label: 'Brands',
    searchable: true,
    searchPlaceholder: 'Search brands...',
    options: [
      { value: 'nike', label: 'Nike' },
      { value: 'adidas', label: 'Adidas' },
      { value: 'puma', label: 'Puma' },
      { value: 'reebok', label: 'Reebok' },
      { value: 'under-armour', label: 'Under Armour' },
      { value: 'new-balance', label: 'New Balance' },
      { value: 'asics', label: 'Asics' },
      { value: 'converse', label: 'Converse' },
      { value: 'vans', label: 'Vans' },
      { value: 'fila', label: 'Fila' },
    ],
  },
};

export const VirtualizedList: Story = {
  render: () => {
    const cityNames = [
      'Tokyo',
      'Delhi,',
      'Shanghai',
      'Mumbai',
      'Beijing',
      'Dhaka',
      'Osaka',
      'São Paulo, Brazil',
      'Mexico City, Apex Colony, BreadHunt Street, Runway City, United Mexican States',
      'Cairo',
      'New York City, United States of America',
      'Karachi',
      'Buenos Aires, Argentine Republic',
      'Chongqing',
      'Istanbul',
      'Kolkata',
      'Manila',
      'Lagos',
      'Rio de Janeiro, Federative Republic of Brazil',
      'Tianjin',
      'Kinshasa',
      'Guangzhou',
      'Los Angeles, California, United States',
      'Moscow',
      'Shenzhen',
      'Lahore',
      'Bangalore',
      'Paris',
      'Bogotá, Republic of Colombia',
      'Jakarta',
      'Chennai',
      'Lima',
      'Bangkok',
      'Seoul',
      'Nagoya',
      'Hyderabad',
      'London',
      'Tehran',
      'Chicago, Illinois, United States of America',
      'Chengdu',
      'Nanjing',
      'Wuhan',
      'Ho Chi Minh City, Socialist Republic of Vietnam',
      'Luanda',
      'Ahmedabad',
      'Kuala Lumpur, Federal Territory, Malaysia',
      "Xi'an",
      'Hong Kong',
      'Dongguan',
    ];

    // Generate 500 items with varying text lengths
    const options = Array.from({ length: 500 }, (_, i) => {
      const cityName = cityNames[i % cityNames.length];
      const suffix = i >= cityNames.length ? ` Region ${Math.floor(i / cityNames.length)}` : '';
      return {
        value: `city-${i}`,
        label: `${cityName}${suffix}`,
      };
    });

    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This filter contains <strong>500 cities</strong> with varying text lengths. Try scrolling
          through the list to see virtualization in action!
        </p>
        <FilterPill
          label="Cities"
          searchable
          searchPlaceholder="Search cities..."
          options={options}
          onApply={(selected) => console.log('Selected cities:', selected)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates virtualization with 500+ items of varying text lengths for optimal performance.',
      },
    },
  },
};

export const WithoutSearch: Story = {
  args: {
    label: 'Size',
    searchable: false,
    options: [
      { value: 'xs', label: 'Extra Small (XS)' },
      { value: 's', label: 'Small (S)' },
      { value: 'm', label: 'Medium (M)' },
      { value: 'l', label: 'Large (L)' },
      { value: 'xl', label: 'Extra Large (XL)' },
    ],
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Filter',
    icon: <FilterIcon size="xs" color="gray" />,
    searchable: true,
    options: [
      { value: 'option-1', label: 'Option 1' },
      { value: 'option-2', label: 'Option 2' },
      { value: 'option-3', label: 'Option 3' },
    ],
  },
};

export const IconVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <FilterPill
        label="Filter"
        icon={<FilterIcon size="xs" color="gray" />}
        searchable
        options={[
          { value: 'new', label: 'New Items' },
          { value: 'sale', label: 'On Sale' },
          { value: 'featured', label: 'Featured' },
        ]}
      />
      <FilterPill
        label="Favorites"
        icon={<StarIcon size="xs" color="warning" />}
        options={[
          { value: 'bookmarked', label: 'Bookmarked' },
          { value: 'liked', label: 'Liked' },
          { value: 'recent', label: 'Recently Viewed' },
        ]}
      />
      <FilterPill
        label="Settings"
        icon={<SettingsIcon size="xs" color="gray" />}
        options={[
          { value: 'display-grid', label: 'Grid View' },
          { value: 'display-list', label: 'List View' },
          { value: 'display-compact', label: 'Compact View' },
        ]}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [options, setOptions] = useState([
      { value: 'mens-casual', label: 'MENS CASUAL', checked: false },
      { value: 'womens-wear', label: 'WOMENS WEAR', checked: false },
      { value: 'kids-wear', label: 'KIDS WEAR', checked: false },
      { value: 'accessories', label: 'ACCESSORIES', checked: false },
    ]);

    const handleApply = (selectedValues: string[]) => {
      console.log('Applied filters:', selectedValues);
      alert(`Applied filters: ${selectedValues.join(', ') || 'None'}`);
    };

    const handleClear = () => {
      console.log('Filters cleared');
      setOptions((prev) => prev.map((opt) => ({ ...opt, checked: false })));
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          💡 The count only appears after clicking <strong>Apply</strong>, not while selecting
        </p>
        <FilterPill
          label="Segment"
          options={options}
          searchable
          searchPlaceholder="Search segments..."
          onApply={handleApply}
          onClear={handleClear}
        />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    // Generate 200 country names with full official names for variety
    const countries = [
      'US',
      'UK',
      'Canada',
      'Germany',
      'France',
      'Japan',
      'Australia',
      'Brazil',
      'India',
      'China',
      'Italy',
      'Spain',
      'Mexico',
      'South Korea',
      'Netherlands',
      'Switzerland',
      'Sweden',
      'Norway',
      'Denmark',
      'Finland',
      'Belgium',
      'Austria',
      'Poland',
      'Portugal',
      'Greece',
      'Czech Republic',
      'Ireland',
      'New Zealand',
      'Singapore',
      'Israel',
      'United Arab Emirates',
      'Saudi Arabia',
      'Turkey',
      'South Africa',
      'Argentina',
      'Chile',
      'Colombia',
      'Peru',
      'Venezuela',
      'Ecuador',
      'Thailand',
      'Malaysia',
      'Indonesia',
      'Philippines',
      'Vietnam',
      'Egypt',
      'Nigeria',
      'Kenya',
      'Morocco',
      'Algeria',
      'Ukraine',
      'Romania',
      'Hungary',
      'Slovakia',
      'Croatia',
      'Serbia',
      'Bulgaria',
      'Slovenia',
      'Lithuania',
      'Latvia',
      'Estonia',
      'Iceland',
      'Luxembourg',
      'Malta',
      'Cyprus',
      'Georgia',
      'Armenia',
      'Azerbaijan',
      'Kazakhstan',
      'Uzbekistan',
      'Islamic Republic of Pakistan',
      "People's Republic of Bangladesh",
      'Democratic Socialist Republic of Sri Lanka',
      'Federal Democratic Republic of Nepal',
      'Islamic Republic of Afghanistan',
      'Republic of Iraq',
      'Islamic Republic of Iran',
      'Hashemite Kingdom of Jordan',
      'Lebanese Republic',
      'Syrian Arab Republic',
      'State of Kuwait',
      'State of Qatar',
      'Kingdom of Bahrain',
      'Sultanate of Oman',
      'Republic of Yemen',
      'Tunisian Republic',
      'State of Libya',
      'Republic of the Sudan',
      'Federal Democratic Republic of Ethiopia',
      'Republic of Ghana',
      'Republic of Cameroon',
      "Republic of Côte d'Ivoire",
      'Republic of Senegal',
      'Republic of Uganda',
      'United Republic of Tanzania',
      'Republic of Zimbabwe',
      'Republic of Zambia',
      'Republic of Mozambique',
      'Republic of Angola',
      'Republic of Botswana',
      'Republic of Namibia',
      'Republic of Madagascar',
      'Republic of Mauritius',
      'Republic of Rwanda',
      'Burkina Faso',
      'Republic of Mali',
      'Republic of Niger',
      'Republic of Chad',
      'Republic of Benin',
      'Togolese Republic',
      'Republic of Honduras',
      'Republic of Nicaragua',
      'Republic of Costa Rica',
      'Republic of Panama',
      'Republic of Guatemala',
      'Republic of El Salvador',
      'Jamaica',
      'Trinidad and Tobago',
      'Barbados',
      'Commonwealth of The Bahamas',
      'Dominican Republic',
      'Republic of Haiti',
      'Republic of Paraguay',
      'Oriental Republic of Uruguay',
      'Plurinational State of Bolivia',
      'Co-operative Republic of Guyana',
      'Republic of Suriname',
      'French Guiana',
      'Belize',
      'Republic of Cuba',
      'Republic of the Union of Myanmar',
      'Kingdom of Cambodia',
      "Lao People's Democratic Republic",
      'Mongolia',
      'Republic of China (Taiwan)',
      'Hong Kong SAR',
      'Macao SAR',
      'Negara Brunei Darussalam',
      'Republic of Maldives',
      'Kingdom of Bhutan',
      'Independent State of Papua New Guinea',
      'Republic of Fiji',
      'Independent State of Samoa',
      'Kingdom of Tonga',
      'Republic of Vanuatu',
      'Solomon Islands',
      'New Caledonia',
      'Territory of Guam',
      'Republic of Palau',
      'Federated States of Micronesia',
      'Republic of Kosovo',
      'Montenegro',
      'Republic of North Macedonia',
      'Republic of Albania',
      'Bosnia and Herzegovina',
      'Republic of Moldova',
      'Republic of Belarus',
      'Republic of Tajikistan',
      'Kyrgyz Republic',
      'Turkmenistan',
      'State of Palestine',
      'Islamic Republic of Mauritania',
      'Republic of The Gambia',
      'Republic of Guinea',
      'Republic of Sierra Leone',
      'Republic of Liberia',
      'Gabonese Republic',
      'Republic of the Congo',
      'Democratic Republic of the Congo',
      'Central African Republic',
      'Republic of South Sudan',
      'State of Eritrea',
      'Republic of Djibouti',
      'Federal Republic of Somalia',
      'Republic of Seychelles',
      'Union of the Comoros',
      'Kingdom of Lesotho',
      'Kingdom of Eswatini',
      'Réunion',
      'Department of Mayotte',
      'Greenland',
      'Faroe Islands',
      'Bailiwick of Jersey',
      'Bailiwick of Guernsey',
      'Isle of Man',
      'Gibraltar',
      'Principality of Andorra',
      'Principality of Monaco',
      'Principality of Liechtenstein',
      'Most Serene Republic of San Marino',
      'Vatican City State',
      'Sahrawi Arab Democratic Republic',
      'Bermuda',
      'Cayman Islands',
      'Turks and Caicos Islands',
      'British Virgin Islands',
      'United States Virgin Islands',
      'Anguilla',
      'Montserrat',
      'Saint Lucia',
    ];

    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This filter contains <strong>200 countries</strong> with varying name lengths (from "US"
          to "Democratic Socialist Republic of Sri Lanka"). Try scrolling through the list to see
          how virtualization handles different text sizes!
        </p>
        <FilterPill
          label="Country"
          searchable
          searchPlaceholder="Search..."
          options={countries.map((country, i) => ({
            value: `country-${i}`,
            label: country,
          }))}
          onApply={(selected) => console.log('Selected:', selected)}
        />
      </div>
    );
  },
};

export const MultipleFilters: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-3 p-8 bg-gray-50 rounded-md">
        <FilterPill
          label="Category"
          searchable
          searchPlaceholder="Search..."
          options={[
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'furniture', label: 'Furniture' },
          ]}
        />
        <FilterPill
          label="Price Range"
          options={[
            { value: 'under-50', label: 'Under $50' },
            { value: '50-100', label: '$50 - $100' },
            { value: '100-200', label: '$100 - $200' },
            { value: 'over-200', label: 'Over $200' },
          ]}
        />
        <FilterPill
          label="Brand"
          searchable
          searchPlaceholder="Search brands..."
          options={[
            { value: 'nike', label: 'Nike', checked: true },
            { value: 'adidas', label: 'Adidas' },
            { value: 'puma', label: 'Puma' },
          ]}
        />
        <FilterPill
          label="Rating"
          options={[
            { value: '5-star', label: '⭐⭐⭐⭐⭐ 5 Stars' },
            { value: '4-star', label: '⭐⭐⭐⭐ 4 Stars & Up' },
            { value: '3-star', label: '⭐⭐⭐ 3 Stars & Up' },
          ]}
        />
      </div>
    );
  },
};

export const ApplyBehavior: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Apply-Only Count Display</h3>
        <p className="text-sm text-gray-600 mb-4">
          Try this: Open the filter. Notice <strong>Apply and Clear All are disabled</strong>.
          Select some items to enable them. The count badge appears only after clicking{' '}
          <strong>Apply</strong>.
        </p>
        <FilterPill
          label="Category"
          searchable
          searchPlaceholder="Search categories..."
          options={[
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'furniture', label: 'Furniture' },
            { value: 'books', label: 'Books' },
            { value: 'toys', label: 'Toys' },
          ]}
          onApply={(selected) => console.log('Applied:', selected)}
        />
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-xs font-semibold text-gray-600 mb-3">Behavior:</h4>
        <ul className="text-xs text-gray-600 space-y-2">
          <li>🔹 Apply and Clear All disabled when no items selected</li>
          <li>🔹 Buttons enable when at least one item is checked</li>
          <li>🔹 Count badge appears only after clicking Apply</li>
          <li>🔹 Clear All resets selection and count to zero</li>
          <li>🔹 Closing without Apply keeps previous count</li>
        </ul>
      </div>
    </div>
  ),
};

export const DesignSystemFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Vercel Design System</h3>
        <p className="text-sm text-gray-600 mb-4">
          This filter has 1 pre-applied item. Select more, then click Apply to see the count update.
        </p>
        <FilterPill
          label="Category"
          searchable
          searchPlaceholder="Search categories..."
          options={[
            { value: 'electronics', label: 'Electronics', checked: true },
            { value: 'clothing', label: 'Clothing' },
            { value: 'furniture', label: 'Furniture' },
            { value: 'books', label: 'Books' },
          ]}
        />
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-xs font-semibold text-gray-600 mb-3">Design Features:</h4>
        <ul className="text-xs text-gray-600 space-y-2">
          <li>✅ Shadow-as-border technique (no CSS borders)</li>
          <li>✅ Primary blue (#3535F3) focus rings</li>
          <li>✅ Primary blue (#3535F3) checkbox accent</li>
          <li>✅ Primary blue (#3535F3) Apply button</li>
          <li>✅ Count badge with rounded background</li>
          <li>✅ Count only shows after Apply</li>
          <li>✅ Apply & Clear disabled when no selection</li>
          <li>✅ 6px rounded-md button (not pill!)</li>
          <li>✅ Icon library integration</li>
          <li>✅ Font weight 500 for UI elements</li>
          <li>✅ Virtualized list for performance</li>
        </ul>
      </div>
    </div>
  ),
};

/**
 * Date filter pill with calendar picker
 */
export const DateFilter: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    return (
      <div className="flex gap-3 flex-wrap">
        <DateFilterPill
          label="Date"
          startDate={startDate}
          onApply={(start) => {
            setStartDate(start);
            console.log('Selected date:', start);
          }}
          onClear={() => setStartDate(null)}
        />
        {startDate && (
          <div className="text-sm text-neutral-600 flex items-center">
            Selected: <strong className="ml-1">{startDate}</strong>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Date range filter pill with calendar picker
 */
export const DateRangeFilter: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    return (
      <div className="space-y-3">
        <DateFilterPill
          label="Date Range"
          startDate={startDate}
          endDate={endDate}
          enableRange
          onApply={(start, end) => {
            setStartDate(start);
            setEndDate(end);
            console.log('Selected range:', start, '-', end);
          }}
          onClear={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        />
        {startDate && endDate && (
          <div className="text-sm text-neutral-600">
            Selected range:{' '}
            <strong>
              {startDate} to {endDate}
            </strong>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Multiple filter pills including date filter
 */
export const MixedFilters: Story = {
  render: () => {
    const [category, setCategory] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const categoryOptions = [
      { value: 'electronics', label: 'Electronics', checked: false },
      { value: 'clothing', label: 'Clothing', checked: false },
      { value: 'books', label: 'Books', checked: false },
      { value: 'home', label: 'Home & Garden', checked: false },
    ];

    return (
      <div className="space-y-4">
        <div className="flex gap-3 flex-wrap">
          <FilterPill
            label="Category"
            options={categoryOptions}
            searchable
            onApply={(values) => setCategory(values)}
            onClear={() => setCategory([])}
          />
          <DateFilterPill
            label="Date Range"
            startDate={startDate}
            endDate={endDate}
            enableRange
            onApply={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
            onClear={() => {
              setStartDate(null);
              setEndDate(null);
            }}
          />
        </div>

        {(category.length > 0 || (startDate && endDate)) && (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-medium text-neutral-900 mb-2">Active Filters:</p>
            <ul className="text-sm text-neutral-600 space-y-1">
              {category.length > 0 && (
                <li>
                  Categories: <strong>{category.join(', ')}</strong>
                </li>
              )}
              {startDate && endDate && (
                <li>
                  Date Range:{' '}
                  <strong>
                    {startDate} to {endDate}
                  </strong>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
