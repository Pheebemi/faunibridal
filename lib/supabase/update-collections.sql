-- Update collection names to remove "Bridal" prefix
UPDATE collections 
SET title = 'Dresses for Sale'
WHERE id = 'bridal-dresses-for-sale';

UPDATE collections 
SET title = 'Dresses for Rent'
WHERE id = 'bridal-rentals';
