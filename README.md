> Resolution No. 1: 
> The base media type for the VCDM is `credential+ld+json`. `@context` is required (MUST) in the base media type; 
> other media types MAY choose to include `@context`. 
> Serializations in other media types (defined by the VCWG) MUST be able to be transformed into the base media type. 
> Another media type MUST identify if this transformation is `one-directional` or `bi-directional`. 
> Bi-directional transformation MUST preserve `@context`. 
> Transformation rules MUST be defined, but not necessarily by this WG.

- https://github.com/w3c/vc-data-model/issues/947#issuecomment-1434506542


This repository implements a "one-directional mapping" from JWT Claim Sets (after verification) to the VCDM base media type.

The "rules" are implemented as a "node.js" program... Other rules are possible.

VCDM implementers are not required to use this or any other one-directional or bi-directional mappings, it is defined to demonstrate that resolution 1 has been satisified for arbitrary claim sets.