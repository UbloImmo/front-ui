#! /bin/bash

## Adds an entry to CHANGELOG.md, under the unreleased section

# Store provided header & content in variables
header="$1"
content="$2"

# Debug output
echo "Debug: Header = '$header'"
echo "Debug: Content = '$content'"

# Validate provided header
case "$header" in
  Added|Changed|Deprecated|Removed|Fixed|Security)
    echo "Header is valid"
    ;;
  *)
    echo "Header is invalid, aborted changelog update"
    exit 1
    ;;
esac

# Check if changelog exists
if [ ! -f CHANGELOG.md ]; then
    echo "Error: CHANGELOG.md does not exist"
    exit 1
fi

# Function to check if the section exists in Unreleased
has_header() {
    awk -v header="$header" '
        /^## Unreleased$/{unreleased=1; next} 
        /^## /{unreleased=0} 
        unreleased && $0 ~ "^### " header "$" {found=1} 
        END{exit !found}
    ' CHANGELOG.md
}

# Function to append content after the header
append_content_after_header() {
  awk -v header="$header" -v content="$content" '
        # Print content after header
        $0 ~ "^### " header "$" && unreleased {
            print
            # Only insert newline if next line is not empty
            getline nextline
            if (nextline !~ /^$/) {
                print ""
                print content
                print ""
            } else {
                print ""
                print content
            }
            print nextline
            next
        }
        
        # Handle section markers
        /^## Unreleased$/ {
            unreleased=1
        }
        /^## / && !/^## Unreleased$/ {
            unreleased=0
        }
        
        # Print all other lines as-is
        {
            print
        }
    ' CHANGELOG.md > CHANGELOG.md.tmp
}

# Function to create the header and content
create_header_and_content() {
  awk -v header="$header" -v content="$content" '
        # When we hit Unreleased, print the new section
        /^## Unreleased$/ {
            unreleased=1
            print
            # Only insert newline if next line is not empty
            getline nextline
            if (nextline !~ /^$/) {
                print ""
                print "### " header
                print ""
                print content
                print ""
            } else {
                print nextline
                print "### " header
                print ""
                print content
            }
            print nextline
            next
        }
        
        # Handle other section markers
        /^## / && !/^## Unreleased$/ {
            unreleased=0
        }
        
        # Print all other lines as-is
        {
            print
        }
    ' CHANGELOG.md > CHANGELOG.md.tmp
}

# Add the content to the changelog
if has_header; then
  echo "Header exists, appending content"
  append_content_after_header
else
  echo "Header does not exist, creating header and content"
  create_header_and_content
fi

# Check if awk command succeeded
if [ $? -ne 0 ]; then
    echo "Error: awk command failed"
    rm -f CHANGELOG.md.tmp
    exit 1
fi

# Only update the changelog if it has changed
if cmp -s CHANGELOG.md CHANGELOG.md.tmp; then
    echo "CHANGELOG.md has not been updated"
    rm -f CHANGELOG.md.tmp
    exit 0
else
    mv CHANGELOG.md.tmp CHANGELOG.md
    echo "CHANGELOG.md has been updated"
    exit 0
fi