import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CaseNavigator = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const cases = [
    { id: 1, name: 'Case 1: Onboarding Form', path: '/onboarding' },
    { id: 2, name: 'Case 2: Professional Details', path: '/professional-form' },
    { id: 3, name: 'Case 3: Original Form', path: '/original-form' }
  ];
  
  return (
    <div className="bg-white shadow-md mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <nav className="flex space-x-4 py-4">
            {cases.map((caseItem) => (
              <Link 
                key={caseItem.id}
                href={caseItem.path}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPath === caseItem.path
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {caseItem.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CaseNavigator;