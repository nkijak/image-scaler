# Image Scaler
## Custom Lens Correction Chrome App

Set scaling slider, Choose File, image rendered with linear progressive stretching along x-axis (0 - slider scale factor)

### TODO
1. The scaling needs to match the curve of the lens, in my particular case the lense is curved. The scaling is done on a straight line, needs to be on a curved line. Because of this the image has too much scalling in certain areas.
1. Blending.  When a scaled pixel is some fraction of a pixel it should be blended by that fraction into the next origin pixel by 1-fraction.

