type ChildrenToFather = {
  Bob: "George";
  Alice: "George";
  Cindy: "Bob";
  Dave: "Bob";
  Eve: "George";
};

type ChildrenToMother = {
  Bob: "Mary";
  Cindy: "Sue";
  Alice: "Jane";
  // Sue: 'Anna'; -- Uncomment for test edge case when GrandMother<"Cindy"> have two values
};

type ValueOf<T> = T[keyof T];

type Parents<
  ChildrenName extends keyof ChildrenToFather | keyof ChildrenToMother
> =
  | (ChildrenName extends keyof ChildrenToMother
      ? ChildrenToMother[ChildrenName]
      : never)
  | (ChildrenName extends keyof ChildrenToFather
      ? ChildrenToFather[ChildrenName]
      : never);

type GrandFather<Name extends keyof ChildrenToFather> =
  | (Name extends keyof ChildrenToMother
      ? ChildrenToMother[Name] extends keyof ChildrenToFather
        ? ChildrenToFather[ChildrenToMother[Name]]
        : never
      : never)
  | (Name extends keyof ChildrenToFather
      ? ChildrenToFather[Name] extends keyof ChildrenToFather
        ? ChildrenToFather[ChildrenToFather[Name]]
        : never
      : never);

type GrandMother<Name extends keyof ChildrenToFather | keyof ChildrenToMother> =

    | (Name extends keyof ChildrenToMother
        ? ChildrenToMother[Name] extends keyof ChildrenToMother
          ? ChildrenToMother[ChildrenToMother[Name]]
          : never
        : never)
    | (Name extends keyof ChildrenToFather
        ? ChildrenToFather[Name] extends keyof ChildrenToMother
          ? ChildrenToMother[ChildrenToFather[Name]]
          : never
        : never);

type Childrens<
  T extends ValueOf<ChildrenToFather> | ValueOf<ChildrenToMother>
> = T extends ValueOf<ChildrenToFather>
  ? ValueOf<{
      [K in keyof ChildrenToFather]: ChildrenToFather[K] extends T ? K : never;
    }>
  : T extends ValueOf<ChildrenToMother>
  ? ValueOf<{
      [K in keyof ChildrenToMother]: ChildrenToMother[K] extends T ? K : never;
    }>
  : Error;

type Siblings<T extends keyof ChildrenToFather | keyof ChildrenToMother> =
  Exclude<
    ValueOf<{
      [K in Parents<T>]: Childrens<K>;
    }>,
    T
  >;

type i1 = Parents<"Alice">;
type i2 = GrandFather<"Cindy">;
type i3 = GrandMother<"Cindy">;
type i4 = Childrens<"Bob">;
type i5 = Siblings<"Bob">;
type i6 = Siblings<"Alice">;
