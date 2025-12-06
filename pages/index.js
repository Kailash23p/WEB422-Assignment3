/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Vivek Patel Student ID: 146973235 Date: 2025-12-05 
* Vercel Link: https://web-422-assignment3-two.vercel.app/  
*
********************************************************************************/

import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import PageHeader from '@/components/PageHeader';
import styles from '@/styles/Home.module.css';

const author = 'terry pratchett';
const buildQueryString = (query = {}) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry !== undefined && entry !== null && entry !== '') {
          params.append(key, entry);
        }
      });
    } else {
      params.append(key, value);
    }
  });

  return params.toString();
};

const defaultQueryString = buildQueryString({ author });

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);
  const router = useRouter();

  const queryString = useMemo(() => {
    if (!router.isReady) {
      return '';
    }

    return buildQueryString(router.query);
  }, [router.isReady, router.query]);

  const summaryText = useMemo(() => {
    if (!router.isReady || Object.keys(router.query).length === 0) {
      return `author: Terry Pratchett`;
    }

    return Object.entries(router.query)
      .map(([key, value]) => {
        const resolvedValue = Array.isArray(value) ? value.join(', ') : value ?? '';
        return `${key}: ${resolvedValue}`;
      })
      .join(' • ');
  }, [router.isReady, router.query]);

  const effectiveQueryString = queryString || defaultQueryString;

  const { data, error, isLoading, isValidating } = useSWR(
    effectiveQueryString
      ? `https://openlibrary.org/search.json?${effectiveQueryString}&page=${page}&limit=10`
      : null,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      dedupingInterval: 2000,
    }
  );

  useEffect(() => {
    if (data) {
      console.log('Received book data:', data.numFound, 'total results,', data.docs?.length, 'books in current page');
      setPageData(data);
    }
  }, [data]);
  
  useEffect(() => {
    if (error) {
      console.error('Error loading books:', error);
    }
  }, [error]);

  useEffect(() => {
    setPage(1);
  }, [queryString]);

  const previous = () => {
    setPage((current) => (current > 1 ? current - 1 : current));
  };

  const next = () => {
    setPage((current) => current + 1);
  };

  const books = pageData?.docs ?? [];

  return (
    <div>
      <PageHeader text="Search Results" subtext={`Search parameters — ${summaryText}`} />
      {error && <p className="text-danger">An error occurred while loading the book list.</p>}
      {!pageData && (isLoading || isValidating) && <p>Loading books…</p>}
      {pageData && !error && (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>First Published</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              if (!book.key) {
                return null;
              }
              return (
                <tr
                  key={book.key}
                  className={styles.tableRow}
                  onClick={() => router.push(book.key)}
                  role="button"
                >
                  <td>{book.title || 'Untitled'}</td>
                  <td>{book.first_publish_year ?? 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={previous} disabled={page <= 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </div>
  );
}
