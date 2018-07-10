pkg_name=ynabdoctor
pkg_origin=gruberbastian
pkg_version="0.1.0"
pkg_scaffolding="core/scaffolding-node"

do_build() {
  # Becuase of a bug that's been in NPM for a while
  # where `npm list` will error because optional dependencies
  # are not installed :(
  # we set this here and then when do_default_build runs
  # it will get this setting and everything will be fine
  # https://github.com/npm/npm/issues/19393
  echo "optional=false" > "$CACHE_PATH/.npmrc"
  do_default_build
}
