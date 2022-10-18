import { Skeleton } from '@mui/material';

export default function RowSkeleton() {
  return (
    <div className="d-flex flex-row gap-3">
      <div>
        <Skeleton width={75} height={75} variant="rounded" />
      </div>
      <div className="d-flex flex-column">
        <Skeleton variant="text" width={300} sx={{ fontSize: '2rem' }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
      </div>
    </div>
  );
}
