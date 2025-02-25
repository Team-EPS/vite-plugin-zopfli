{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-24.11";
    nixpkgs-unstable.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
    nixpkgs-unstable,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    unstable-pkgs = nixpkgs-unstable.legacyPackages.${system};
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = [unstable-pkgs.bun];
    };
  };
}
